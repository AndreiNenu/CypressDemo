export class Index{
[x: string]: any

//header panel locators(left menu)
aboutUsLink   = ".leftmenu > :nth-child(2) > a"
servicesLink  = ".leftmenu > :nth-child(3) > a"
productsLink  = ".leftmenu > :nth-child(4) > a"
locationsLink = ".leftmenu > :nth-child(5) > a"
adminPageLink = ".leftmenu > :nth-child(6) > a"

//header panel locators(buttons)
homePageButton = "#headerPanel > .button > .home > a"
aboutUsButton  = "#headerPanel > .button > .aboutus > a"
contactButton  = "#headerPanel > .button > .contact > a"

//login panel locators(Customer Login)
username = "input[name='username']"
password = "input[name='password']"
loginButton = "input[value='Log In']"
forgotLoginInfoLink = "#loginPanel > :nth-child(2) > a"
registerLink = "#loginPanel > :nth-child(3) > a"

//body panel locators(left panel)(Account Services)
fullnameWelcomeMessage = ".smallText"
openNewAccountLink = "#leftPanel > ul > :nth-child(1) > a"
accountsOverviewLink = "#leftPanel > ul > :nth-child(2) > a"
transferFundsLink = "#leftPanel > ul > :nth-child(3) > a"
billPayLink = "#leftPanel > ul > :nth-child(4) > a"
findTransactionsLink = "#leftPanel > ul > :nth-child(5) > a"
updateContactInfoLink = "#leftPanel > ul > :nth-child(6) > a"
requestLoanLink = "#leftPanel > ul > :nth-child(7) > a"
logoutLink = "#leftPanel > ul > :nth-child(8) > a"

//locators login successfull messages
loginSuccessfullTitle = "#rightPanel > .title"
loginSuccessfullMessage = "#rightPanel > p"

//locators login errors messages
loginErrorTitle = ".title"
loginErrorMessage = ".error"

/**********************************************************************/

//functions for header panel(left menu) locators
clickAboutUsLink(){
    cy.get(this.aboutUsLink).click()
}

clickServicesLink(){
    cy.get(this.servicesLink).click() 
}

clickProductsLink(){
    cy.get(this.productsLink).click()
}

clickLocationsLink(){
    cy.get(this.locationsLink).click()
}

clickAdminPageLink(){
    cy.get(this.adminPageLink).click()
}

//functions for header panel(buttons) locators
clickHomePageButton(){
    cy.get(this.homePageButton).click()
}

clickAboutUsButton(){
    cy.get(this.aboutUsButton).click()
}

clickContactButton(){
    cy.get(this.contactButton).click()
}

//functions for login panel locators(Customer Login)
getUsername(){
    return cy.get(this.username)   
}

getPassword(){
    return cy.get(this.password)   
}

clickLoginButton(){
    cy.get(this.loginButton).click()
}

clickForgotLoginInfoLink(){
    cy.get(this.forgotLoginInfoLink).click()
}

clickRegisterLink(){
    cy.get(this.registerLink).click()
}

//functions for Account Services
getFullnameWelcomeMessage(){
    return cy.get(this.fullnameWelcomeMessage)
}

clickOpenNewAccountLink(){
    cy.get(this.openNewAccountLink).click()
    return this
}

clickAccountsOverviewLink(){
    cy.get(this.accountsOverviewLink).click()
    return this
}

clickTransferFundsLink(){
    cy.get(this.transferFundsLink).click()
    return this
}

clickBillPayLink(){
    cy.get(this.billPayLink).click()
    return this
}

clickFindTransactionsLink(){
    cy.get(this.findTransactionsLink).click()
    return this
}

clickUpdateContactInfoLink(){
    cy.get(this.updateContactInfoLink).click()
    return this
}

clickRequestLoanLink(){
    cy.get(this.requestLoanLink).click()
    return this
}

clickLogOutLink(){
    cy.get(this.logoutLink).click()
    return this
}

//functions login successfull messages
getLoginSuccessfullTitle(){
    return cy.get(this.loginSuccessfullTitle)
}

getLoginSuccessfullMessage(){
    return cy.get(this.loginSuccessfullMessage)
}

//functions for login errors messages
getLoginErrorTitle(){
    return cy.get(this.loginErrorTitle)
}

getLoginErrorMessage(){
    return cy.get(this.loginErrorMessage)
}

}