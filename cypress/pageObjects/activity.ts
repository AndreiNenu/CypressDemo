export class Activity{

//locators field
accountType = "#accountType" 
  
    
//functions
getAccountType(){
    return cy.get(this.accountType)
}
    
}