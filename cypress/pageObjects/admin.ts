export class Admin {

    //locators field
    dataAccessModeJDBC = "#accessMode4" // JDBC radio button
    initialBalance = "#initialBalance"
    submitAdminSettingsButton = "input[value='Submit']"
    loanProvider = "#loanProvider"

    //functions
    checkAccessModeJDBC() {
        return cy.get(this.dataAccessModeJDBC).check()
    }

    getInitialBalance() {
        console.log(cy.getValue(this.initialBalance))
        console.log(cy.getText(this.initialBalance))
        return cy.getValue(this.initialBalance)
    }

    setInitialBalance(value: string) {
        return cy.get(this.initialBalance).clear().type(value)
    }

    applyAdminSettings() {
        cy.get(this.submitAdminSettingsButton).click()
    }

    chooseLoanProvider(value: string){             // the values are: jms, ws or local
        cy.get(this.loanProvider).select(value)
    }

}