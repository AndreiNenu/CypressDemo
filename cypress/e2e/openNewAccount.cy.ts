import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Admin } from "../pageObjects/admin";
import { OpenAccount } from "../pageObjects/openAccount"

const openAccount = new OpenAccount()
const index = new Index()
const admin = new Admin()
let myUser: User
let myAccountIDs: string[] = [] 

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

    //To be able to run Open New Account tests separate from other tests
    //create a new random user and return the new user login info
    index.clickHomePageButton()
    index.clickRegisterLink()
    cy.registerRandomUser().then(user => {
        myUser = user;
    })
    
})

beforeEach('', () => {
    index.clickOpenNewAccountLink()
    cy.url().then(url => {
         expect(url).to.contain('openaccount.htm')
    })
})

after('', () => {
})

describe('Open new accounts tests', () => {

it('Check open new account page title and texts', () => {
    
    openAccount.checkOpenNewAccountTitle()
    openAccount.checkOpenNewAccountPageTexts()

})

it.only('Create checking account and verify it', () => {
    
    cy.getAccountsIDs()
        .then($elem => {
            myAccountIDs = $elem
            console.log('Test array: ' + myAccountIDs + ' ' + 'NumberOfIDsTests: ' + myAccountIDs.length)
            cy.selectTypeOfAccount('savings')
            console.log('Parametrul meu: ' + myAccountIDs[0])
            cy.selectFromAccount(myAccountIDs[0])
            openAccount.clickOpenNewAccountButton()
        })

    
    
})

it('Create savings account and verify it', () => {
    
   

})

})