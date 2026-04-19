/**Test Case: Add product to Cart
 * 
 * Tags:@master @regression
 * 
 * 1.Navigate to application URL
 * 2.Enter an existing product name in search box
 * 3.Click search button
 * 4.Verfy the products appeared in search results
 * 5.Select the product
 * 6.Set the quantity
 * 7.Add product to cart
 * 8.Verify the succes message
 * 
 * 
 * 
 */

import { test, expect } from '@playwright/test';
import { TestConfig } from '../test.config';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';


let config: TestConfig;
let homepage: HomePage;
let searchResultsPage: SearchResultsPage;
let productPage: ProductPage;

test.beforeEach(async ({ page }) => {
config=new TestConfig();
//step 1.navigate to application URL
await page.goto(config.appurl);

homepage = new HomePage(page);
searchResultsPage = new SearchResultsPage(page);
productPage = new ProductPage(page);

})
    

test.afterEach(async ({ page }) => {
    await page.close();
})

test('add to cart test @master @regression', async () => {

    //step 2.enter the product name in search box 
    await homepage.enterProductName(config.productName);

    //step 3.click search button
    await homepage.clickSearch();
    //step 4.veerify search results page is displayed
    expect(await searchResultsPage.isSearchResultsPageExists()).toBeTruthy();
    //step 5.verify the product is displayed in search results
    const productName=config.productName;
    expect(await searchResultsPage.isProductExist(productName)).toBeTruthy();

    //step6,7,8: select the product=>set quantity=>add to cart 
    if(await searchResultsPage.isProductExist(productName)){
        await searchResultsPage.selectProduct(productName);
        await productPage.setQuantity(config.productQuantity);
        await productPage.addToCart();

        //step 8.Assert success message is displayed
        expect(await productPage.isConfirmationMessageVisible()).toBeTruthy();
    }


})