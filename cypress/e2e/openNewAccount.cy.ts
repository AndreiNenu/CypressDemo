import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Activity } from "../pageObjects/activity";
import { Admin } from "../pageObjects/admin";
import { OpenAccount } from "../pageObjects/openAccount"
import { Overview } from "../pageObjects/overview";

const openAccount = new OpenAccount()
const index = new Index()
const admin = new Admin()
const activity = new Activity()
let myUser: User

before('', () => {

    //Preconditions for Open New Accounts Tests

    //Go to Parabank site
    cy.visit('index.htm')

    //Check JDBC radio button and apply settings button
    //Do this in order for Parabank app to be stable and error free
    index.clickAdminPageLink()
    admin.checkAccessModeJDBC()
    admin.setInitialBalance('5000')
    admin.applyAdminSettings()

})

beforeEach('', () => {

    //To be able to run Open New Account tests separate from other tests
    //create a new random user and return the new user login info
    cy.visit('index.htm')
    index.clickHomePageButton()
    index.clickRegisterLink()
    cy.registerRandomUser().then(user => {
        myUser = user;
        index.clickLogOutLink()
    })
    cy.intercept('GET', '**/parabank/openaccount.htm').as('openAccPage')
    cy.intercept('POST', '**/parabank/services_proxy/bank/*').as('accOpenResp')
})

after('', () => {
})

describe('Open new accounts tests', () => {

    it('Check open new account page title and texts', () => {
        cy.loginUser(myUser.username, myUser.password)
        //index.clickOpenNewAccountLink()
        cy.get('a[href="openaccount.htm"]').click()

        openAccount.checkOpenNewAccountTitle()
        openAccount.checkOpenNewAccountPageTexts()

    })

    it('Create a cheking account and verify that was created', () => {
        cy.loginUser(myUser.username, myUser.password)
        //index.clickOpenNewAccountLink()
        cy.get('a[href="openaccount.htm"]').click()
        cy.openNewAccount('CHECKING', 0)

        cy.wait('@accOpenResp').then(() => {
            cy.get('#newAccountId')
                .should('be.visible')
                .click()

            activity.getAccountType()
                .should('be.visible')
                .should('have.text', 'CHECKING')
        })

    })

    it('Create a savings account and verify that was created', () => {
        cy.loginUser(myUser.username, myUser.password)
        //index.clickOpenNewAccountLink()
        cy.get('a[href="openaccount.htm"]').click()
        cy.openNewAccount('SAVINGS', 0)

        cy.wait('@accOpenResp').then(() => {
            cy.get('#newAccountId')
                .should('be.visible')
                .click()

            activity.getAccountType()
                .should('be.visible')
                .should('have.text', 'SAVINGS')
        })

    })


    it('Create a total of 5 checking accounts accounts and verify it', () => {
        cy.loginUser(myUser.username, myUser.password)
        //index.clickOpenNewAccountLink()
        cy.get('a[href="openaccount.htm"]').click()
        for (let i = 0; i < 4; i++) {
            cy.openNewAccount('CHECKING', 0)
        }

        cy.getAccountsIDs()
            .then($elem => {
                cy.wrap($elem)
                    .should('have.length', 5)
            })
    })

})