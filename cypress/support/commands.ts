/// <reference types="cypress" />

import { User } from "../interfaces/user"
import { Register } from "../pageObjects/register"

const register = new Register()

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
 Cypress.Commands.add('registerRandomUser', () => { 

    const user: User = {
        firstName: 'Andrei',
        lastName: 'Nenu',
        address: 'Libertatii Nr.12B',
        city: 'Fagaras',
        state: 'Brasov',
        zipCode: '500200',
        phoneNumber: '0723123456',
        socialSecurityNumber: "",
        username: getRandomUserName(),
        password: '1234'
    }

    register.getFirstName().type(user.firstName)
    register.getLastName().type(user.lastName)
    register.getAddress().type(user.address)
    register.getCity().type(user.city)
    register.getState().type(user.state)
    register.getZipCode().type(user.zipCode)
    register.getPhoneNumber().type(user.phoneNumber)
    register.getSocialSecurityNumber().type(user.socialSecurityNumber)
    register.getUsername().type(user.username)
    register.getPassword().type(user.password)
    register.getConfirmPassword().type(user.password)
    register.getRegisterButton().click()

  })

  function getRandomUserName(){
    return ''
  }

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

export{} //it is required for the declaration of global below 

declare global{
    namespace Cypress{
        interface Chainable{
            registerRandomUser(): Chainable<void>
        }
    }
}