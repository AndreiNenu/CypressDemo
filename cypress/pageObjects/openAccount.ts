export class OpenAccount{

    //locators for page texts
    openAccountPageTitle = "#openAccountForm > .title"
    typeOfAccountText = "#openAccountForm > form :nth-child(1) > b"
    minimumAmmountText = "#openAccountForm > form :nth-child(5) > b"

    //locators dropdown menus
    selectAccountDropdown = "#type.input"
    fromAccountDropdown = "#fromAccountId"

    //other locators
    openNewAccountButton = "input[value='Open New Account']"
    
    //functions

    clickOpenNewAccountButton(){
        cy.get(this.openNewAccountButton).click()
    }

    checkOpenNewAccountTitle(){
        cy.get(this.openAccountPageTitle)
            .should('be.visible')
            .and('have.text', 'Open New Account')
    }
    
    checkOpenNewAccountPageTexts(){
        cy.get(this.typeOfAccountText)
            .should('be.visible')
            .and('have.text', 'What type of Account would you like to open?')
        cy.get(this.minimumAmmountText)
            .should('be.visible')
            .and('have.text', 'A minimum of $100.00 must be deposited into this account at time of opening. Please choose an existing account to transfer funds into the new account.')
    }
    
    }