export class Index{

//locators fields
username = "input[name='username']"
password = "input[name='password']"
loginButton = "input[value='Log In']"
welcomeMessage = ".smallText"

//locators links
registerLink = "#loginPanel > :nth-child(3) > a"
logOutLink = "#leftPanel > ul > :nth-child(8) > a"

//locators errors
loginErrorTitle = ".title"
loginErrorMessage = ".error"

//functions
getUsername(){
    return cy.get(this.username)   
}

getPassword(){
    return cy.get(this.password)   
}

clickLoginButton(){
    return cy.get(this.loginButton).click()
}

clickRegisterLink(){
    return cy.get(this.registerLink).click()
}

clickLogOutLink(){
    return cy.get(this.logOutLink).click()
}

getWelcomeMessage(){
    return cy.get(this.welcomeMessage)
}

getLoginErrorTitle(){
    return cy.get(this.loginErrorTitle)
}

getLoginErrorMessage(){
    return cy.get(this.loginErrorMessage)
}

}