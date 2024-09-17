/// <reference types="cypress" />

import { User } from "../interfaces/user"
import { Index } from "../pageObjects"
import { Overview } from "../pageObjects/overview"
import { Register } from "../pageObjects/register"
import { OpenAccount } from "../pageObjects/openAccount"
import { RequestLoan } from "../pageObjects/requestLoan"

const register = new Register()
const index = new Index()
const overview = new Overview()
const openAccount = new OpenAccount()
const requestLoan = new RequestLoan()

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
  //cy.visit('overview.htm')
  accountIDs.length = 0

  cy.get(overview.overviewTableUsers)
    .each(($elem, index) => {
      const text = $elem.text()
      if (text !== 'Total') {
        accountIDs.push(text)
      }
    })

  return cy.wrap(accountIDs)
})

Cypress.Commands.add('selectTypeOfAccount', (typeOfAccount: string) => {

  //need to be on open new account page as a prerequisite

  if (typeOfAccount === 'CHECKING' || typeOfAccount === 'checking') {
    cy.get(openAccount.selectAccountDropdown).select('CHECKING')
  }
  else if (typeOfAccount === 'SAVINGS' || typeOfAccount === 'savings') {
    cy.get(openAccount.selectAccountDropdown).select('SAVINGS')
  }

})

Cypress.Commands.add('selectFromAccount', (selectFromAccount: any) => {

  //need to be on open new account page as a prerequisite

  cy.get(openAccount.fromAccountDropdown).select(selectFromAccount)

})

Cypress.Commands.add('openNewAccount', (typeOfAccount: string, selectFromAccount: any) => {

  cy.visit('openaccount.htm')

  cy.selectTypeOfAccount(typeOfAccount)

  cy.selectFromAccount(selectFromAccount)

  openAccount.clickOpenNewAccountButton()

})

Cypress.Commands.add('getText', (selector) => {
  cy.get(selector)
    .then($el => $el.text())
})

Cypress.Commands.add('getValue', (selector) => {
  cy.get(selector)
    .then($el => $el.val())
})

Cypress.Commands.add('requestLoan', (amount: number, payment: number) => {
  cy.get(requestLoan.loanAmount).type(amount.toString())
  cy.get(requestLoan.downPayment).type(payment.toString())
  cy.get(requestLoan.fromAccountDropdown).select(0)
  cy.get(requestLoan.applyForLoanButton).click()
})

Cypress.Commands.add('addAmmount', (initialAmount: number, addAmmount: number) => {
  const result = initialAmount + addAmmount

  return cy.wrap(result.toString())
})

Cypress.Commands.add('subtractAmount', (initialAmount: number, substractAmmount: number) => {
  const result = initialAmount - substractAmmount

  //funds.returnDiff = result.toString()
  return cy.wrap(result.toString())

})

function getRandomNumber(min: number, max: number) {
  return Math.round(Math.random() * (max - min) + min)
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

export { } //it is required for the declaration of global below 

declare global {
  namespace Cypress {
    interface Chainable {
      registerRandomUser(): Chainable<User>
      registerUser(username: string, password: string): Chainable<void>
      loginUser(username: string, password: string): Chainable<void>
      getText(selector: any): Chainable<void>
      getValue(selector: any): Chainable<void>
      getAccountsIDs(): Chainable<any>
      selectTypeOfAccount(typeOfAccount: string): Chainable<void>
      selectFromAccount(selectFromAccount: any): Chainable<void>
      openNewAccount(typeOfAccount: string, selectFromAccount: any): Chainable<any>
      requestLoan(amount: number, payment: number): Chainable<any>
      addAmmount(initialAmount: number, addAmmount: number): Chainable<string>
      subtractAmount(initialAmount: number, substractAmmount: number): Chainable<string>
    }
  }
}