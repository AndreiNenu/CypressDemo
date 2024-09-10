import { over } from "cypress/types/lodash";
import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Overview } from "../pageObjects/overview";

const index = new Index()
const overview = new Overview()
let myUser: User;

before('', () => {
    cy.visit('register.htm')
    cy.registerRandomUser().then(user => {
        myUser = user;
    })
    index.clickLogOutLink()
})

beforeEach('', () => {

})

after('', () => {
})

describe('Overview Tests', () => {

it.only('Check account overview data', () => {
    cy.loginUser(myUser.username, myUser.password)
    cy.visit('overview.htm')
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