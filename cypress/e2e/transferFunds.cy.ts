import { User } from "../interfaces/user";
import { Index } from "../pageObjects";
import { Admin } from "../pageObjects/admin";
import { Account } from "../interfaces/accounts";
import { TransferFunds } from "../pageObjects/transferFunds";

const index = new Index()
const admin = new Admin()
const transfer = new TransferFunds()
let myUser: User
let account1: Account
let account2: Account
let transferSum: string

before('', () => {

    //Preconditions for Transfer Funds Tests

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

    //To be able to run Transfer Funds tests separate from other tests
    //create a new random user and return the new user login info
    cy.visit('index.htm')
    index.clickRegisterLink()
    cy.registerRandomUser().then(user => {
        myUser = user;
        index.clickLogOutLink()
    })
    cy.intercept('GET', '**/parabank/overview.htm').as('overview')
    cy.intercept('GET', '**/parabank/openaccount.htm').as('openAccPage')
    cy.intercept('GET', '**/parabank/transfer.htm').as('transfer')
    cy.intercept('POST', '**/parabank/services_proxy/bank/**').as('accOpenResp')
    cy.intercept('GET', '**/parabank/services_proxy/bank/customers/**').as('overviewTable')
    cy.intercept('POST', '**/parabank/services_proxy/bank/transfer**').as('transComplete')

})


describe('Transfer Funds tests', () => {

    it('transfer funds successfully and validate the transfer messages and sums', () => {

        cy.loginUser(myUser.username, myUser.password)
            .then(() => {
                cy.wait('@overview')
                    .then(() => {
                        index.clickOpenNewAccountLink()
                        cy.wait('@openAccPage')
                        cy.openNewAccount('CHECKING', 0)
                        cy.wait('@accOpenResp')
                            .then(() => {
                                index.clickAccountsOverviewLink()
                                cy.wait('@overviewTable')
                                cy.get('tbody')
                                    .find('tr')
                                    .first()
                                    .then(($row) => {
                                        account1 = {
                                            id: $row.find('td').eq(0).text(),
                                            balance: parseFloat($row.find('td').eq(1).text().replace('$', '')),
                                            amount: parseFloat($row.find('td').eq(2).text().replace('$', ''))
                                        }
                                        console.log(account1.id + ' ' + account1.balance + ' ' + account1.amount)
                                        cy.wait('@overviewTable')
                                        cy.get('tbody')
                                            .find('tr')
                                            .eq(1)
                                            .then(($row) => {
                                                account2 = {
                                                    id: $row.find('td').eq(0).text(),
                                                    balance: parseFloat($row.find('td').eq(1).text().replace('$', '')),
                                                    amount: parseFloat($row.find('td').eq(2).text().replace('$', ''))
                                                }
                                                console.log('\n' + console.log(account2.id + ' ' + account2.balance + ' ' + account2.amount))
                                                index.clickTransferFundsLink()
                                                cy.wait('@transfer')
                                                    .then(() => {
                                                        transferSum = '2350'
                                                        transfer.transferFunds(transferSum, account1.id, account2.id)
                                                        cy.wait('@transComplete')
                                                        transfer.validateTransferTexts(transferSum, account1.id, account2.id)
                                                        return cy.wrap(transferSum)
                                                            .then(() => {
                                                                index.clickAccountsOverviewLink()
                                                                cy.wait('@overview')
                                                                    .then(() => {
                                                                        cy.get('tbody')
                                                                            .find('tr')
                                                                            .find('td:nth-child(2)')
                                                                            .then(($currentbalances) => {
                                                                                cy.subtractAmount(account1.balance, parseFloat(transferSum)).then(($diff) => {
                                                                                    expect($currentbalances.eq(0).text().replace('$', '').replace('.00', '')).to.equal($diff)
                                                                                    cy.wrap($currentbalances).then(() => {
                                                                                        cy.addAmmount(account2.balance, parseFloat(transferSum)).then(($add) => {
                                                                                            expect($currentbalances.eq(1).text().replace('$', '').replace('.00', '')).to.equal($add)
                                                                                        })


                                                                                    })

                                                                                })



                                                                            })

                                                                    })
                                                            })
                                                    })
                                            })
                                    })
                            })
                    })
            })

    })

})