export class RequestLoan {

    //locator fields
    loanAmount = "#amount"
    downPayment = "#downPayment"
    fromAccountDropdown = "#fromAccountId"
    applyForLoanButton = "input[value='Apply Now']"

    //other locators
    loanProvider = "#loanProviderName"
    dateLocator = "#responseDate"
    loanStatus = "#loanStatus"
    loanSuccessMessage = "#loanRequestApproved > :nth-child(1)"
    newAccount = "#newAccountId"

    //functions

    validateReqeustLoan() {
        cy.get(this.loanProvider)
            .should('be.visible')
            .and('have.text', 'ParaBank')
        cy.get(this.dateLocator)
            .should('be.visible')
            .and('have.text', '09-17-2024')
        cy.get(this.loanStatus)
            .should('be.visible')
            .and('have.text', 'Approved')
        cy.get(this.loanSuccessMessage)
            .should('be.visible')
            .and('have.text', 'Congratulations, your loan has been approved.')
    }

    clickNewAccount() {
        cy.get(this.newAccount).click()
    }

}