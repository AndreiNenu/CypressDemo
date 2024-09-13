import { Index } from "../pageObjects"
import { Admin } from "../pageObjects/admin"
import { Register } from "../pageObjects/register"

const register = new Register()
const admin = new Admin()
const index = new Index()

before('', () => {
    //Preconditions for Register Tests

    //Go to Parabank site
    cy.visit('index.htm')

    //Check JDBC radio button and apply settings button
    //Do this in order for Parabank app to be stable and error free
    index.clickAdminPageLink()
    admin.checkAccessModeJDBC()
    admin.applyAdminSettings()
})

beforeEach('', () => {
    cy.visit('index.htm') //go to home page
})

after('', () => {
})

describe('Register tests', () => {

it('Check register user functionality with valid data', () => {

    index.clickRegisterLink()

    cy.url().should('include', 'register.htm')   //verify we are on the register page
    
    cy.registerRandomUser().then( user => {

    index.getFullnameWelcomeMessage()
        .should('be.visible')
        .and('have.text', 'Welcome ' + user.firstName + ' ' + user.lastName)

    index.getLoginSuccessfullTitle()
        .should('be.visible')
        .and('have.text', 'Welcome ' + user.username)

    index.getLoginSuccessfullMessage()
        .should('be.visible')
        .and('have.text', 'Your account was created successfully. You are now logged in.')

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
            .should('have.text', 'This username already exists.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')

    })

})

it('Check all input register fields that are mandatory', () => {

    index.clickRegisterLink()
    cy.url().should('include', 'register.htm') //verify we are on the register page
    register.getRegisterButton().click()   //triggerMandatoryErrorMessages
    register.verifyRequiredErrorMessages()

})

})


