import { Index } from "../pageObjects"
import { Register } from "../pageObjects/register"

const register = new Register()
const index = new Index()

before('', () => {
})

beforeEach('', () => {
    cy.visit('index.htm') //go to home page
})

after('', () => {
})

describe('Register tests', () => {

it('Check that register user works with valid data', () => {

    index.clickRegisterLink()

    cy.url().should('include', 'register.htm') //verify we are on the register page
    
    cy.registerRandomUser().then( user => {

    index.getWelcomeMessage()
        .should('be.visible')
        .and('have.text', 'Welcome ' + user.firstName + ' ' + user.lastName)

    register.getTitle()
        .should('be.visible')
        .and('have.text', 'Welcome ' + user.username)

    })

})

it('Check that an existing user cannot be registered again', () => {

    index.clickRegisterLink()

    cy.url().should('include', 'register.htm') //verify we are on the register page
    
    cy.registerRandomUser().then( user => {

        cy.visit('register.htm')
        cy.registerUser(user.username, user.password)
        cy.get(register.usernameAlreadyExistsError)
            .should('be.visible')

    })

})

it('Check that all register fields are mandatory', () => {

    index.clickRegisterLink()

    cy.url().should('include', 'register.htm') //verify we are on the register page
    
    register.getRegisterButton().click()   //triggerMandatoryErrorMessages
    register.checkRequiredErrorMessages()

})

})


