/**
 * Test Case:User Logout
 * 
 * Tags:@master @regression
 * 
 * Steps:
 * 1) Navigate to the application URL
 * 2) Go to Login page from Home page
 * 3) Login with valid credentials
 * 4) Verify "My Account" page
 * 5) click on logout link
 * 6) click on continue btn
 * 7) verify user is redirected to Home page
 * 
 */

import {test,expect} from '@playwright/test';
import { TestConfig } from '../test.config';    
import { HomePage } from '../pages/HomePage';
import { LoginPage } from '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { LogoutPage } from '../pages/LogOutPage';

let config:TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let myAccountpage:MyAccountPage;
let logoutpage:LogoutPage;

test.beforeEach(async({page})=>
{
    config=new TestConfig();

    await page.goto(config.appurl);


    //Intialize Page Objects
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    myAccountpage=new MyAccountPage(page);
    //logoutpage=new LogoutPage(page);   

});
test.afterEach(async({page})=>
{
    await page.close();



})

test(`user logout test @master @regression`,async()=>
{

    //Step 2.Navigate to Login page

    await homepage.clickMyAccount();
    await homepage.clickLogin();

    //step 3.perform login using valid credentials

    await loginpage.login(config.email,config.password);

    //step 4. verify a successful login

    expect(await myAccountpage.isMyAccountPageExists()).toBeTruthy();

    //step 5. Click logout which returns logout instance

   logoutpage= await myAccountpage.clickLogout();

    //step 6.verify continue button is visible before clicking
    expect(await logoutpage.isContinueButtonVisible()).toBe(true);


    //step 7.click on continue btn  and verify redirection to home page
    homepage=await logoutpage.clickContinue();
    expect(await homepage.isHomePageExists()).toBe(true);





})

