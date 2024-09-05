export class Register{

    //locators fields
    firstName: string = "#customer.firstName"
    lastName: string = "#customer.lastName"
    address: string = "#customer.address.street"
    city: string = "#customer.address.city"
    state: string = "#customer.address.state"
    zipCode: string = "#customer.address.zipCode"
    phoneNumber: string = "#customer.phoneNumber"
    socialSecurityNumber: string = "#customer.ssn"
    username: string = "#customer.username"
    password: string = "#customer.password"
    confirmPassword: string = "#repeatedPassword"
    registerButton: string = "input[value='Register']"   //a trebuit cautat dupa value nu dupa input type

    //functions
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

}