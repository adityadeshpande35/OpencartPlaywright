/**
 * Test Case:Account Registration
 *
 * Tags:@master @sanity @Regression
 *
 * Steps:
 *
 * 1)Navigate to Application url
 * 2)go to my account and click register
 * 3)fill in registration details with random data
 * 4)agree to privacy policy and submit the form
 * 5)validate the confirmation message
 *
 */

import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { RandomDataUtil } from "../utils/randomDataGenrator";
import { TestConfig } from "../test.config";

let homepage: HomePage;
let registrationpage: RegistrationPage;
let config: TestConfig;

test.beforeEach(async ({ page }) => {
  config = new TestConfig();
  await page.goto(config.appurl);
  homepage = new HomePage(page);
  registrationpage = new RegistrationPage(page);
});

test.afterEach(async ({ page }) => {
  await page.waitForTimeout(3000);

  await page.close();
});

test("user registration test @master @sanity @regression", async () => {
  //go to my account and click register

  await homepage.clickMyAccount();
  await homepage.clickRegister();

  //fill in registration detail with random data

  await registrationpage.setFirstName(RandomDataUtil.getFirstName());
  await registrationpage.setLastName(RandomDataUtil.getLastName());
  await registrationpage.setEmail(RandomDataUtil.getEmail());
  await registrationpage.setTelephone(RandomDataUtil.getPhoneNumber());
  const password = RandomDataUtil.getPassword();
  await registrationpage.setPassword(password);
  await registrationpage.setConfirmPassword(password);
  await registrationpage.setPrivacyPolicy();
  await registrationpage.clickContinue();

  //validate the confirmation message
  const confirmationmsg = await registrationpage.getConfirmationMsg();
  await expect(confirmationmsg).toContain("Your Account Has Been Created!");
});
