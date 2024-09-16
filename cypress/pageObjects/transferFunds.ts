export class TransferFunds{

//locator fields
amount = "#amount"
fromAccount ="#fromAccountId"
toAccount = "#toAccountId"
transferButton = 'input[value="Transfer"]'

//result locators
transferTitle = "#showResult .title"
transferMessage = "#showResult > :nth-child(2)"
transferFooter = "#showResult > :nth-child(3)"

//error locators
errorTitle = '#showError > h1'
internalErrorMessage = "#showError > p"

//functions

transferFunds(amount: string, fromAcc: string, toAcc: string){
    cy.get(this.amount).type(amount)
    cy.get(this.fromAccount).select(fromAcc)
    cy.get(this.toAccount).select(toAcc)
    cy.get(this.transferButton).click()

    return this
}

validateTransferTexts(amount: string, fromAcc: string, toAcc: string){
    cy.get(this.transferTitle)
        .should('be.visible')
        .and('have.text', 'Transfer Complete!')

    cy.get(this.transferMessage)
        .should('be.visible')
        .and('have.text', '\n\t\t\t$'+amount+'.00 has been transferred from account #'+fromAcc+' to account #'+toAcc+'.\n\t\t')

    cy.get(this.transferFooter)
        .should('be.visible')
        .contains('See Account Activity for more details.')

    return this
}

}   


