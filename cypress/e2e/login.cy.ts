import { User } from "../interfaces/user";
import { Index } from "../pageObjects";

const index = new Index()
let myUser: User;

before('', () => {
    cy.visit('register.htm')
    cy.registerRandomUser().then(user => {
        myUser = user;
    })
    index.clickLogOutLink()
})

beforeEach('', () => {
    cy.visit('index.htm') //go to home page
})

after('', () => {
})

describe('Login Tests', () => {

it('Check login functionality with valid credentials', () => {

        cy.loginUser(myUser.username, myUser.password)

        cy.url().then(url => {
            expect(url).to.contain('overview.htm')
        })

        index.getWelcomeMessage()
            .should('be.visible')
            .and('have.text', 'Welcome ' + myUser.firstName + ' ' + myUser.lastName)

})

it('Check login with invalid credentials', () => {

    cy.loginUser('invalidUser', 'invalidPassword')

    index.getLoginErrorTitle()
        .should('be.visible')
        .and('have.text', 'Error!')

    index.getLoginErrorMessage()
        .should('be.visible')
        .and('have.text', 'The username and password could not be verified.')

})

})