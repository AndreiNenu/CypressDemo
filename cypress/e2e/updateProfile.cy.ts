import { update } from "cypress/types/lodash";
import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Admin } from "../pageObjects/admin";
import { UpdateProfile } from "../pageObjects/updateProfile";

const index = new Index()
const admin = new Admin()
const updateProfile = new UpdateProfile()
let myUser: User
let initProfile: any[] = []

before('', () => {

    //Preconditions for Update Profile Tests

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

    //To be able to run Update Profile tests separate from other tests
    //create a new random user and return the new user login info
    cy.visit('index.htm')
    index.clickRegisterLink()
    cy.registerRandomUser().then(user => {
        myUser = user;
        index.clickLogOutLink()
    })
    cy.intercept('GET', '**/parabank/overview.htm').as('overview')
    cy.intercept('GET', '**/parabank/updateprofile.htm').as('updatePage')
    cy.intercept('POST', '**/parabank/services_proxy/bank/customers/update/**').as('updateProfile')
})

after('', () => {
})

describe('Open new accounts tests', () => {

    it('update contact info and validate it', () => {

        cy.loginUser(myUser.username, myUser.password)

        cy.wait('@overview')
            .then(() => {
                cy.wrap(index.clickUpdateContactInfoLink())
                    .then(() => {
                        cy.wait('@updatePage')
                        cy.wait(1000)
                            .then(() => {
                                updateProfile.updateContactInfo()
                                cy.wait('@updateProfile')
                                    .then(() => {
                                        updateProfile.validateUpdateOfContactInfoResponse()
                                        index.clickUpdateContactInfoLink()
                                        cy.wait('@updatePage').then(() => {
                                            updateProfile.validateUpdateOfContactInfo()
                                        })
                                    })
                            })
                    })
            })

    })

})

