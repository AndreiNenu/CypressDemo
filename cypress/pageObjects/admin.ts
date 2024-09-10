export class Admin{

//locators field
dataAccessModeJDBC = "#accessMode4" // JDBC radio button
submitAdminSettingsButton = "input[value='Submit']"

//functions
checkAccessModeJDBC(){
    return cy.get(this.dataAccessModeJDBC).check()
}

applyAdminSettings(){
    cy.get(this.submitAdminSettingsButton).click()
}



}