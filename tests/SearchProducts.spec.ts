/**
 * Test Case:Product Search
 * 
 * Tags:@master @regression
 * 
 * Steps:
 * 1) Navgate to application URL
 * 2) Enter the product name on search Field
 * 3) click the search button
 * 4) Verify if the product name is displayed in search results
 * 
 * 
 */

import {test,expect} from '@playwright/test';
import { TestConfig } from '../test.config';    
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage} from '../pages/SearchResultsPage';

let config:TestConfig;
let homepage:HomePage;
let searchResultsPage:SearchResultsPage;

test.beforeEach(async({page})=>
{
    config=new TestConfig();
    await page.goto(config.appurl);

    homepage=new HomePage(page);
    searchResultsPage=new SearchResultsPage(page);
});

test.afterEach(async({page})=>
{
    await page.close();
})

test(`product search test @master @regression`,async()=>
{

      //step 2.enter the product name in search box 
    const productName=config.productName;
    await homepage.enterProductName(productName);
    //step 3.click search button
    await homepage.clickSearch();

    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();

    const isProductFound=await searchResultsPage.isProductExist(productName);
    expect(isProductFound).toBeTruthy();


})