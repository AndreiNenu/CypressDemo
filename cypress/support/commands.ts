/// <reference types="cypress" />

import { over } from "cypress/types/lodash"
import { User } from "../interfaces/user"
import { Index } from "../pageObjects"
import { Overview } from "../pageObjects/overview"
import { Register } from "../pageObjects/register"
import { OpenAccount } from "../pageObjects/openAccount"

const register = new Register()
const index = new Index()
const overview = new Overview()
const openAccount = new OpenAccount()

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

const accountIDs: string[] = []

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

    //console.log(user.username)

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

  Cypress.Commands.add('getAccountsIDs', () => {

    index.clickAccountsOverviewLink()

    cy.get(overview.overviewTableUsers)
      .each(($elem, index) => {
        const text = $elem.text()
        if(text !== 'Total'){
          accountIDs.push(text)
        }
      })
      return cy.wrap(accountIDs)
  })

  Cypress.Commands.add('selectTypeOfAccount', (typeOfAccount: string) => {

    index.clickOpenNewAccountLink()

    if( typeOfAccount === 'CHECKING' || typeOfAccount === 'checking')
      {
        cy.get(openAccount.selectAccountDropdown).select('CHECKING')
      }
      else if(typeOfAccount === 'SAVINGS' || typeOfAccount === 'savings')
      {
        cy.get(openAccount.selectAccountDropdown).select('SAVINGS')
      }
      
  })

  Cypress.Commands.add('selectFromAccount', (fromAccount: any) => {

    index.clickOpenNewAccountLink()

    cy.get(openAccount.fromAccountDropdown).select(fromAccount)
      
  })

  Cypress.Commands.add('getText', (selector) => {
    cy.get(selector)
      .then($el => $el.text())
  })

  Cypress.Commands.add('getValue', (selector) => {
    cy.get(selector)
      .then($el => $el.val())
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
            getValue(selector: any): Chainable<void>
            getAccountsIDs(): Chainable<any>
            selectTypeOfAccount(typeOfAccount: string): Chainable<void>
            selectFromAccount(fromAccount: any): Chainable<void>
        }
    }
}