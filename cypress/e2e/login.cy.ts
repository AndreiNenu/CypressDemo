import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Admin } from "../pageObjects/admin";

const index = new Index()
const admin = new Admin()
let myUser: User;

before('', () => {

    //Preconditions for Login Tests

    //Go to Parabank site
    cy.visit('index.htm')

    //Check JDBC radio button and apply settings button
    //Do this in order for Parabank app to be stable and error free
    index.clickAdminPageLink()
    admin.checkAccessModeJDBC()
    admin.applyAdminSettings()

    //To be able to run Login tests separate from other tests
    //create a new random user and return the new user login info
    index.clickHomePageButton()
    index.clickRegisterLink()
    cy.registerRandomUser().then(user => {
        myUser = user;
    })
    index.clickLogOutLink()
})

beforeEach('', () => {
    cy.visit('index.htm')
})

after('', () => { })

describe('Login Tests', () => {

    it('Check login functionality with valid credentials', () => {

        cy.loginUser(myUser.username, myUser.password)

        cy.url().then(url => {
            expect(url).to.contain('overview.htm')
        })

        index.getFullnameWelcomeMessage()
            .should('be.visible')
            .and('have.text', 'Welcome ' + myUser.firstName + ' ' + myUser.lastName)

    })

    it('Check login functionality with invalid credentials', () => {

        cy.loginUser('invalidUser', 'invalidPassword')

        index.getLoginErrorTitle()
            .should('be.visible')
            .and('have.text', 'Error!')

        index.getLoginErrorMessage()
            .should('be.visible')
            .should('have.text', 'The username and password could not be verified.')
            .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

})