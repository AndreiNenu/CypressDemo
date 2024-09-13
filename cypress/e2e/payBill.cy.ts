
import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Admin } from "../pageObjects/admin";
import { PayBill } from "../pageObjects/payBill";
import { Account } from "../interfaces/accounts";


const index = new Index()
const admin = new Admin()
const payBill = new PayBill()
let myUser: User
let account1: Account


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
    cy.intercept('GET', '**/parabank/billpay.htm').as('billpay')
    cy.intercept('GET', '**/parabank/services_proxy/bank/customers/**').as('account')
    cy.intercept('POST', '**/parabank/services_proxy/bank/**').as('billpayed')
})

after('', () => {
})

describe('Open new accounts tests', () => {

it('check that empty payment fields trigger required error messages', () => {
    
    cy.loginUser(myUser.username, myUser.password)

    index.clickBillPayLink()

    payBill.clickSendPayment()

    payBill.verifyRequiredErrorMessages()

})

it('check that invalid inputs trigger invalid error messages', () => {

    cy.loginUser(myUser.username, myUser.password)

    index.clickBillPayLink()

    payBill.triggerInvalidErrorMessages()

    payBill.verifyInvalidErrorMessages()
    
})

it('Create a savings account and verify that was created', () => {
    
    cy.loginUser(myUser.username, myUser.password)

    index.clickBillPayLink()

    payBill.triggerMismatchErrorMessages()

    cy.get(payBill.payeeVerifyAccountMismatchError)
        .should('be.visible')
        .should('have.text', 'The account numbers do not match.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
   
})

it('send bill payment and validate it', () => {
    
    cy.loginUser(myUser.username, myUser.password)
    console.log(account1)
    cy.wait('@account')
        .then(() => {
            cy.visit('overview.htm')
            cy.wait('@overview')
            cy.get('tbody')
            .find('tr')
            .first()
            .then(($row)=>{
                account1 = {
                    id: $row.find('td').eq(0).text(),
                    accountType: $row.find('td').eq(1).text(),
                    balance: $row.find('td').eq(2).text().replace('$', '')
                    }
                })
                .then(() => {
                    cy.wrap(index.clickBillPayLink())
                    .then(() => {
                        cy.wait('@billpay')
                        .then(() => {
                            payBill.fillBillForm()
                            payBill.clickSendPayment()
                            cy.wait('@billpayed')
                            .then(() => {
                                payBill.billCompleteValidation(account1.id)

                            })
                        })
                    })
                })
            })

})

})