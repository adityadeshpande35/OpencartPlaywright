import {Page,Locator,expect} from  '@playwright/test';

export class RegistrationPage{


    private readonly page:Page;
    //locators
    private readonly txtFirstname:Locator;
    private readonly txtLastname:Locator;
    private readonly txtEmail:Locator;
    private readonly txtTelephone:Locator;
    private readonly txtPassword:Locator;
    private readonly txtConfirmPassword:Locator;
    private readonly chkPolicy:Locator;
    private readonly btnContinue:Locator;
    private readonly msgConfirmation:Locator;

    constructor(page:Page)
    {
        this.page=page;
        this.txtFirstname=page.locator("#input-firstname");
        this.txtLastname=page.locator("#input-lastname");
        this.txtEmail=page.locator("#input-email");
        this.txtTelephone=page.locator("#input-telephone");
        this.txtPassword=page.locator('#input-password');
        this.txtConfirmPassword=page.locator('#input-confirm')
        this.chkPolicy=page.locator('input[name="agree"]')
        this.btnContinue=page.locator('input[value="Continue"]');
        this.msgConfirmation=page.locator('h1:has-text("Your Account Has Been Created!")')


    }

   
    async setFirstName(fname:string):Promise<void>
    {
        await this.txtFirstname.fill(fname);
    }

   

    async setLastName(lname:string):Promise<void>
    {
        await this.txtLastname.fill(lname);
    }

   

    async setEmail(email:string):Promise<void>
    {
        await this.txtEmail.fill(email);
    }

   

    
    async setTelephone(telephone:string):Promise<void>
    {
        await this.txtTelephone.fill(telephone);
    }

      

    
    async setPassword(password:string):Promise<void>
    {
        await this.txtPassword.fill(password);
    }

    
      

    
    async setConfirmPassword(confirmpassword:string):Promise<void>
    {
        await this.txtConfirmPassword.fill(confirmpassword);
    }


 

    async setPrivacyPolicy():Promise<void>
    {
        await this.chkPolicy.check();
    }

    

     async clickContinue():Promise<void>
     {
        await this.btnContinue.click();
     }

     
     async getConfirmationMsg():Promise<string>
     {
        return await this.msgConfirmation.textContent() ?? '';

     }

    
async completeRegistration(userdata:{
    firstname:string,
    lastname:string,
    email:string,
    telephone:string,
    password:string

    }):Promise<void>
    
{

    await this.setFirstName(userdata.firstname);
    await this.setLastName(userdata.lastname);
    await this.setEmail(userdata.email);
    await this.setTelephone(userdata.telephone);
    await this.setPassword(userdata.password);
    await this.setConfirmPassword(userdata.password);
    await this.setPrivacyPolicy();
    await this.clickContinue();
    await expect(this.msgConfirmation).toBeVisible();


}



}


