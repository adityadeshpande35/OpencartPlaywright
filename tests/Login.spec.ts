/**
 * Test case:Login with valid credentials
 * 
 * Steps
 * 1) Navigate to application url
 * 2) Navigate to login page via home page
 * 3) Enter Valid Credentials  and login
 * 4) Verify successful login by checking 'My Account' page  Presence
 * 
  */

import{test,expect} from '@playwright/test';
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { MyAccountPage } from  "../pages/MyAccountPage";
import { TestConfig } from "../test.config";


let config:TestConfig;
let homepage:HomePage;
let loginpage:LoginPage;
let myAccountPage:MyAccountPage;

test.beforeEach(async ({ page })=>
{
    config=new TestConfig();
    await page.goto(config.appurl);
    homepage=new HomePage(page);
    loginpage=new LoginPage(page);
    myAccountPage=new MyAccountPage(page);
})



test.afterEach(async ({ page })=>
{
    await page.close();
})

test("user login test  @master @sanity @regression",async()=>
{
    await homepage.clickMyAccount();
    await homepage.clickLogin();
    await loginpage.setEmail(config.email);
    await loginpage.setPassword(config.password);
    await loginpage.clickLogin();

    //Alternaively
   //await loginpage.login(config.email,config.password);

   //verify successful login by checking my account page presence

   const isLoggedIn=await myAccountPage.isMyAccountPageExists();
   expect(isLoggedIn).toBeTruthy();


})