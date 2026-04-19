/**
 * Test Case:End to End test on Demo E-commerce  Application
 * 
 * Pudpose:
 * This test simulates a complete user flow on an e-commerce site
 * 
 * 
 * steps:
 * 1)Register a new user account
 * 2)Logout after successful registration
 * 3)Login with the newly created account
 * 4)Search for a product ans add it to cart
 * 5)Verify cart contents
 * 6)Attempt checkout (disabled since feature is not implemented in demo site)
 * 
 * 
 */

import{test,expect,Page} from '@playwright/test';
import {RegistrationPage} from '../pages/RegistrationPage';
import { HomePage } from '../pages/HomePage';
import { TestConfig } from '../test.config';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { RandomDataUtil } from "../utils/randomDataGenrator";
import {LogoutPage} from '../pages/LogoutPage';
import{LoginPage} from '../pages/LoginPage';
import{MyAccountPage} from '../pages/MyAccountPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckoutPage } from '../pages/CheckoutPage';   

test("execute end to end test flow @end-to-end", async ({ page }) => {

    const config = new TestConfig();

    //Navigate to application's home page
    await page.goto(config.appurl);
    
    //step 1: Register a new user account and capture genrated email
    const  registeredEmail:string= await performRegistration(page);
    console.log("Registration is  completed!");
    //step 2: Logout after successful registration
    await performLogout(page);
    console.log("Logout is completed!");
    //step 3: Login with the newly registered email
    await performLogin(page, registeredEmail);
    console.log("Login is completed!");
    //step 4: Search for a product and add it to cart
    await addProductToCart(page);
    console.log("Product added to cart successfully!");

    //step 5: Verify cart contents of shipping cart
    await verifyShoppingCart(page);
    console.log("Shopping cart verification completed!");

    //step 6:perform checkout (disabled since feature is not implemented in demo site)
 //  await isCheckoutPageExists(page);
    


    //function to register a new user account
    async function performRegistration(page:Page):Promise<string>{
        const homePage = new HomePage(page);
        await homePage.clickMyAccount();
        await homePage.clickRegister();

        const registrationPage = new RegistrationPage(page);
        await registrationPage.setFirstName(RandomDataUtil.getFirstName());
        await registrationPage.setLastName(RandomDataUtil.getLastName());

        let email:string=RandomDataUtil.getEmail();
        await registrationPage.setEmail(email);
        await registrationPage.setTelephone(RandomDataUtil.getPhoneNumber());

        await registrationPage.setPassword("test123");
        await registrationPage.setConfirmPassword("test123");

        await registrationPage.setPrivacyPolicy();
        await registrationPage.clickContinue();

        const confirmationMsg = await registrationPage.getConfirmationMsg();
        expect(confirmationMsg).toContain("Your Account Has Been Created!");

        return email;

    }
        //function to logout the current user

        async function performLogout(page:Page):Promise<void>{
            
                const myAccountPage = new MyAccountPage(page);
                const logoutPage:LogoutPage = await myAccountPage.clickLogout();

                //ensure the continue button is visible on logout page
                expect(await logoutPage.isContinueButtonVisible()).toBe(true);

                //Click continue and verify redirection to home page
                const homePage:HomePage = await logoutPage.clickContinue();
                expect(await homePage.isHomePageExists()).toBe(true);

            }


            //function to login using the registered email 
            async function performLogin(page:Page, email:string):Promise<void>{
               const config= new TestConfig();
              await page.goto(config.appurl);

              const homePage = new HomePage(page);
              await homePage.clickMyAccount();
              await homePage.clickLogin();

              const loginPage = new LoginPage(page);
                await loginPage.login(email, "test123");

                //verify successful login by checking the presence of My Account page
                const myAccountPage = new MyAccountPage(page);
                expect(await myAccountPage.isMyAccountPageExists()).toBeTruthy;
            }

            //function to search for a product and add it to cart
            async function addProductToCart(page:Page):Promise<void>{
                const homePage = new HomePage(page);
                const config = new TestConfig();
                const productName:string = config.productName;
                const productQuantity:string = config.productQuantity;

                await homePage.enterProductName(productName);
                await homePage.clickSearch();

                const searchResultsPage = new SearchResultsPage(page);
                //validate search results page  
                expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();


            //validate that  the desired product is present in search results
                expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

                //select the product and set the quantity 
               const productPage = await searchResultsPage.selectProduct(productName);
               await productPage?.setQuantity(productQuantity);
                await productPage?.addToCart();

                await page.waitForTimeout(3000);

                //confirm product was added
                expect(await productPage?.isConfirmationMessageVisible()).toBe(true);
            }


            async function verifyShoppingCart(page:Page):Promise<void>{

                const productPage = new ProductPage(page);

                await productPage.clickItemsToNavigateToCart();
                const shoppingCartPage = await productPage.clickViewCart();

                console.log("Navigated to shopping cart page");

                const config = new TestConfig();


                //validate shopping cart page is loaded
                expect(await shoppingCartPage.getTotalPrice()).toBe(config.totalPrice);



            }


            async function isCheckoutPageExists(page:Page):Promise<void>{
                const checkoutPage = new CheckoutPage(page);
                expect(await checkoutPage.isCheckoutPageExists()).toBeTruthy();
            }

        













})