/// <reference types="cypress" />

import { User } from "../interfaces/user"
import { Index } from "../pageObjects"
import { Register } from "../pageObjects/register"

const register = new Register()
const index = new Index()

const user: User = {
  firstName: 'Andrei',
  lastName: 'Nenu',
  address: 'Libertatii Nr.12B',
  city: 'Fagaras',
  state: 'Brasov',
  zipCode: '500200',
  phoneNumber: '0723123456',
  socialSecurityNumber: "0123456789",
  username: 'andrei',
  password: '1234'
}

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

    user.username = 'andrei' + getRandomNumber(0, 999)

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

    console.log(user.username)

    return cy.wrap(user)
    
  })

  Cypress.Commands.add('registerUser', (username: string, password: string) => { 

    register.getFirstName().type(user.firstName)
    register.getLastName().type(user.lastName)
    register.getAddress().type(user.address)
    register.getCity().type(user.city)
    register.getState().type(user.state)
    register.getZipCode().type(user.zipCode)
    register.getPhoneNumber().type(user.phoneNumber)
    register.getSocialSecurityNumber().type(user.socialSecurityNumber)
    register.getUsername().type(username)
    register.getPassword().type(password)
    register.getConfirmPassword().type(password)
    register.getRegisterButton().click()
    
  })

  Cypress.Commands.add('loginUser', (username: string, password: string) => {

    index.getUsername().type(username)
    index.getPassword().type(password)
    index.clickLoginButton()

  })

  Cypress.Commands.add('getText', (selector) => {
    cy.get(selector)
      .then($el => $el.text())
  })

  function getRandomNumber(min: number, max: number){
    return  Math.round( Math.random() * (max - min) + min )
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
            registerRandomUser(): Chainable<User>
            registerUser(username: string, password: string): Chainable<void>
            loginUser(username: string, password: string): Chainable<void>
            getText(selector: any): Chainable<void>
        }
    }
}