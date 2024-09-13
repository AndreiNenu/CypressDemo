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

    verifyRequiredErrorMessages(){

        cy.get(this.firstNameRequiredError)
            .should('be.visible')
            .should('have.text', 'First name is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.lastNameRequiredError)
            .should('be.visible')
            .should('have.text', 'Last name is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.addressRequiredError)
            .should('be.visible')
            .should('have.text', 'Address is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.cityRequiredError)
            .should('be.visible')
            .should('have.text', 'City is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.stateRequiredError)
            .should('be.visible')
            .should('have.text', 'State is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.zipCodeRequiredError)
            .should('be.visible')
            .should('have.text', 'Zip Code is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.socialSecurityNumberRequiredError)
            .should('be.visible')
            .should('have.text', 'Social Security Number is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.usernameRequiredError)
            .should('be.visible')
            .should('have.text', 'Username is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.passwordRequiredError)
            .should('be.visible')
            .should('have.text', 'Password is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        cy.get(this.confirmPasswordRequiredError)
            .should('be.visible')
            .should('have.text', 'Password confirmation is required.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
        
    }

    getFirstName(){
        return cy.get(this.firstName)   
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

}