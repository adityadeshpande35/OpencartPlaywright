import{test,expect} from '@playwright/test';
import{LoginPage} from  '../pages/LoginPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import {DataProvider} from '../utils/dataprovider';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';


//Load json test data logindata.json

const jsonPath="testdata/logindata.json"
const jsonTestData=DataProvider.getTestDataFromJson(jsonPath);

for (const data of jsonTestData)
{

    test(`Login Test with JSON Data :${data.testName} @datadriven`,async({page})=>

        {
            const config=new TestConfig();
            await page.goto(config.appurl);

            const homepage=new HomePage(page);
            await homepage.clickMyAccount();
            await homepage.clickLogin();

            const loginPage=new LoginPage(page);
            await loginPage.login(data.email,data.password);

            if(data.expected.toLowerCase()==='success')
            {
                const myAccountPage=new MyAccountPage(page);
                const isLoggedIn=await myAccountPage.isMyAccountPageExists();
                expect(isLoggedIn).toBeTruthy();
            }
            else
            {
                const errorMessage=await loginPage.getLoginErrorMsg();
                expect(errorMessage).toBe(" Warning: No match for E-Mail Address and/or Password.")
            }

        }
)

}

//Login CSV test data logindata.json
const csvPath="testdata/logindata.json"
const csvTestData=DataProvider.getTestDataFromJson(jsonPath);

for (const data of csvTestData)
{

    test(`Login Test with CSV Data :${data.testName} @datadriven`,async({page})=>

        {
            const config=new TestConfig();
            await page.goto(config.appurl);

            const homepage=new HomePage(page);
            await homepage.clickMyAccount();
            await homepage.clickLogin();

            const loginPage=new LoginPage(page);
            await loginPage.login(data.email,data.password);

            if(data.expected.toLowerCase()==='success')
            {
                const myAccountPage=new MyAccountPage(page);
                const isLoggedIn=await myAccountPage.isMyAccountPageExists();
                expect(isLoggedIn).toBeTruthy();
            }
            else
            {
                const errorMessage=await loginPage.getLoginErrorMsg();
                expect(errorMessage).toBe(" Warning: No match for E-Mail Address and/or Password.")
            }

        }
)

}