import{Page,Locator} from '@playwright/test';
export class LoginPage
{
    private readonly page:Page;

    //Locators
     private readonly txtEmailAddress:Locator;
     private readonly txtPassword:Locator;
     private readonly btnLogin:Locator;
     private readonly txtErrorMessage:Locator;


     constructor(page:Page)
     {
        this.page=page;
        this.txtEmailAddress=page.locator('#input-email');
        this.txtPassword=page.locator('#input-password');
        this.btnLogin=page.locator('input[value="Login"]');
        this.txtErrorMessage=page.locator('.alert.alert-danger.alert-dismissible')
     }


     async setEmail(email:string)
     {
        await this.txtEmailAddress.fill(email);
     }

     
     async setPassword(pwd:string)
     {
        await this.txtPassword.fill(pwd);
     }

     async clickLogin()
     {

        await this.btnLogin.click();

     }

     async login(email:string,pwd:string)
     {

        await this.setEmail(email);
        await this.setPassword(pwd);
        await this.clickLogin();
     }

     async getLoginErrorMsg():Promise <null | string>

     {
        return(this.txtErrorMessage.textContent())

     }



}
