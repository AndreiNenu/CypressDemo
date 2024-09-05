import { Login } from "../pageObjects/login"
import { Register } from "../pageObjects/register"

const register = new Register()
const login = new Login()

before('', () => {
})

beforeEach('', () => {
    cy.visit('index.htm') //go to home page
})

after('', () => {
})

describe('Register tests', () => {

it('Check that register user works with valid data', () => {

    login.clickRegisterLink()

    cy.url().should('include', 'register.htm') //verify we are on the register page
    
    cy.registerRandomUser().then( user => {

    login.getWelcomeMessage()
        .should('be.visible')
        .and('have.text', 'Welcome ' + user.firstName + ' ' + user.lastName)

    register.getTitle()
        .should('be.visible')
        .and('have.text', 'Welcome ' + user.username)

    })

})

it('Check that an existing user cannot be registered again', () => {

    login.clickRegisterLink()

    cy.url().should('include', 'register.htm') //verify we are on the register page
    
    cy.registerRandomUser().then( user => {

        cy.visit('register.htm')
        cy.registerUser(user.username, user.password)
        cy.get(register.usernameAlreadyExistsError)
            .should('be.visible')

    })

})

it('Check that all register fields are mandatory', () => {

    login.clickRegisterLink()

    cy.url().should('include', 'register.htm') //verify we are on the register page
    
    register.getRegisterButton().click()   //triggerMandatoryErrorMessages
    register.checkRequiredErrorMessages()

})

})


