import { over } from "cypress/types/lodash";
import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Overview } from "../pageObjects/overview";
import { Admin } from "../pageObjects/admin";

const index = new Index()
const overview = new Overview()
const admin = new Admin()
let myUser: User;


before('', () => {

    //Preconditions for Overview Tests

    //Go to Parabank site
    cy.visit('index.htm')

    //Check JDBC radio button and apply settings button
    //Do this in order for Parabank app to be stable and error free
    index.clickAdminPageLink()
    admin.checkAccessModeJDBC()
    admin.applyAdminSettings()

    //To be able to run Overview tests separate from other tests
    //create a new random user and return the new user login info
    index.clickHomePageButton()
    index.clickRegisterLink()
    cy.registerRandomUser().then(user => {
        myUser = user;
    })
    
})

beforeEach('', () => {

})

after('', () => {
})

describe('Overview Tests', () => {

it.only('Check account overview data', () => {
    
    index.clickAccountsOverviewLink()
    
    cy.url().then(url => {
         expect(url).to.contain('overview.htm')
    })

    overview.checkTable()
    overview.checkTableHeadData()
    overview.checkTableFootData()
    
})

it('Check login with invalid credentials', () => {

    

})

})