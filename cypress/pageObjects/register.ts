export class Register{

    //locators fields
    firstName = "#customer\\.firstName"
    lastName = "#customer\\.lastName"
    address = "#customer\\.address\\.street"
    city= "#customer\\.address\\.city"
    state = "#customer\\.address\\.state"
    zipCode = "#customer\\.address\\.zipCode"
    phoneNumber = "#customer\\.phoneNumber"
    socialSecurityNumber = "#customer\\.ssn"
    username = "#customer\\.username"
    password = "#customer\\.password"
    confirmPassword = "#repeatedPassword"
    registerButton = "input[value='Register']"   //a trebuit cautat dupa value nu dupa input type

    //assertions fields
    registerSuccessfulTitle = ".title"

    //locator errors
    usernameAlreadyExistsError = "#customer\\.username\\.errors"
    firstNameRequiredError = "#customer\\.firstName\\.errors"
    lastNameRequiredError = "#customer\\.lastName\\.errors"
    addressRequiredError = "#customer\\.address\\.street\\.errors"
    cityRequiredError= "#customer\\.address\\.city\\.errors"
    stateRequiredError = "#customer\\.address\\.state\\.errors"
    zipCodeRequiredError = "#customer\\.address\\.zipCode\\.errors"
    socialSecurityNumberRequiredError = "#customer\\.ssn\\.errors"
    usernameRequiredError = "#customer\\.username\\.errors"
    passwordRequiredError = "#customer\\.password\\.errors"
    confirmPasswordRequiredError = "#repeatedPassword\\.errors"
    
    //functions

    checkRequiredErrorMessages(){

        cy.get(this.firstNameRequiredError)
            .should('be.visible')
        cy.get(this.lastNameRequiredError)
            .should('be.visible')
        cy.get(this.addressRequiredError)
            .should('be.visible')
        cy.get(this.cityRequiredError)
            .should('be.visible')
        cy.get(this.stateRequiredError)
            .should('be.visible')
        cy.get(this.zipCodeRequiredError)
            .should('be.visible')
        cy.get(this.socialSecurityNumberRequiredError)
            .should('be.visible')
        cy.get(this.usernameRequiredError)
            .should('be.visible')
        cy.get(this.passwordRequiredError)
            .should('be.visible')
        cy.get(this.confirmPasswordRequiredError)
            .should('be.visible')
        
    }

    getFirstName(){
        return cy.get(this.firstName)   //nu mergea initial deoarece am definit string cu litera mare
    }

    getLastName(){
        return cy.get(this.lastName)
    }

    getAddress(){
        return cy.get(this.address)
    }

    getCity(){
        return cy.get(this.city)
    }

    getState(){
        return cy.get(this.state)
    }

    getZipCode(){
        return cy.get(this.zipCode)
    }

    getPhoneNumber(){
        return cy.get(this.phoneNumber)
    }

    getSocialSecurityNumber(){
        return cy.get(this.socialSecurityNumber)
    }

    getUsername(){
        return cy.get(this.username)
    }

    getPassword(){
        return cy.get(this.password)
    }

    getConfirmPassword(){
        return cy.get(this.confirmPassword)
    }

    getRegisterButton(){
        return cy.get(this.registerButton)
    }

    getTitle(){
        return cy.get(this.registerSuccessfulTitle)
    }

}