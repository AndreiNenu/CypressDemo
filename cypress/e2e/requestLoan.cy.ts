import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Admin } from "../pageObjects/admin";
import { PayBill } from "../pageObjects/payBill";
import { Account } from "../interfaces/accounts";
import { UpdateProfile } from "../pageObjects/updateProfile";
import { values } from "cypress/types/lodash";
import { RequestLoan } from "../pageObjects/requestLoan";


const index = new Index()
const admin = new Admin()
const reqLoan = new RequestLoan()
const updateProfile = new UpdateProfile()
let myUser: User
let initProfile: any[] = []
let account1: Account
let loan: any

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
    index.clickRegisterLink()
    cy.registerRandomUser().then(user => {
        myUser = user;
        index.clickLogOutLink()
    })
    cy.intercept('GET', '**/parabank/overview.htm').as('overview')
    cy.intercept('GET', '**/parabank/requestloan.htm').as('reqLoan')
    cy.intercept('POST', '**/parabank/services_proxy/bank/**').as('loanTaken')
})

after('', () => {
})

describe('Open new accounts tests', () => {

it('update contact info and validate it', () => {
    
    cy.loginUser(myUser.username, myUser.password)

    cy.wait('@overview')
        .then(() => {
            cy.get('tbody')
            .find('tr')
            .first()
            .then(($row)=>{
                account1 = {
                    id: $row.find('td').eq(0).text(),
                    balance: parseFloat($row.find('td').eq(1).text()),
                    amount: parseFloat($row.find('td').eq(2).text().replace('$', ''))
                    }
                    console.log(account1)
                    cy.wrap(index.clickRequestLoanLink())
                }).then(() => {
                    cy.wait('@reqLoan')
                    loan = {
                        loanAmount: '1000',
                        downPayment: '150'
                    } 
                    cy.requestLoan(loan.loanAmount, loan.downPayment)
                            }).then(() => {
                                reqLoan.validateReqeustLoan() 
                                console.log(account1)
                                cy.wait('@loanTaken')
                                cy.wrap(index.clickAccountsOverviewLink())
                                cy.wait('@overview')
                                cy.get('tbody')
                                    .find('tr')
                                    .eq(1)
                                    .find('td')
                                    .eq(1)
                                    .should('have.text', '$'+loan.loanAmount+'.00')

                            })
                        
                        })
            
        })

})

