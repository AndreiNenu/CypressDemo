import { Bill } from "../interfaces/bill"

export class PayBill{

//locator fields
payeeName = 'input[name="payee\\.name"]'
payeeAddress = 'input[name="payee\\.address\\.street"]'
payeeCity = 'input[name="payee\\.address\\.city"]'
payeeState = 'input[name="payee\\.address\\.state"]'
payeeZipCode = 'input[name="payee\\.address\\.zipCode"]'
payeePhone = 'input[name="payee\\.phoneNumber"]'
payeeAccount = 'input[name="payee\\.accountNumber"]'
payeeVerifyAccount = 'input[name="verifyAccount"]'
payAmmount = 'input[name="amount"]'
fromAccountDropdown = 'select[name="fromAccountId"]'
sendPaymentButton = 'input[value="Send Payment"]'

//error fields
payeeNameError = '#validationModel-name'
payeeAddressError = '#validationModel-address'
payeeCityError = '#validationModel-city'
payeeStateError = '#validationModel-state'
payeeZipCodeError = '#validationModel-zipCode'
payeePhoneError = '#validationModel-phoneNumber'
payeeAccountEmptyError = '#validationModel-account-empty'
payeeAccountInvalidError = '#validationModel-account-invalid'
payeeVerifyAccountEmptyError = '#validationModel-verifyAccount-empty'
payeeVerifyAccountInvalidError = '#validationModel-verifyAccount-invalid'
payeeVerifyAccountMismatchError = '#validationModel-verifyAccount-mismatch'
payAmmountEmptyError = '#validationModel-amount-empty'
payAmmountInvalidError = '#validationModel-amount-invalid'
fromAccountDropdownError = 'select[name="fromAccountId"]'

//payment complete fields
billPayCompleteTitle = '#billpayResult .title'
billPayCompleteMessage = '#billpayResult > :nth-child(2)'
billPayCompleteFooter = '#billpayResult > :nth-child(3)'

myBill: Bill = {
    payeeName: 'Darius',
    address: 'Trandafirilor',
    city: 'London', 
    state: 'UK',
    zipCode: '505321',
    phoneNumber: '0723376395',
    account: '90475',
    amount: '1000'
}

//functions

billCompleteValidation(accountID:string){
    cy.get(this.billPayCompleteTitle)
        .should('be.visible')
        .should('have.text', 'Bill Payment Complete')
    cy.get(this.billPayCompleteMessage)
        .should('be.visible')
        .should('contain', this.myBill.payeeName)
        .and('contain', '$'+this.myBill.amount)
        .and('contain', accountID)
    cy.get(this.billPayCompleteFooter)
        .should('be.visible')
        .should('have.text', 'See Account Activity for more details.')
        
}

fillBillForm(){
    cy.get(this.payeeName).clear().type(this.myBill.payeeName)
    cy.get(this.payeeAddress).clear().type(this.myBill.address)
    cy.get(this.payeeCity).clear().type(this.myBill.city)
    cy.get(this.payeeState).clear().type(this.myBill.state)
    cy.get(this.payeeZipCode).clear().type(this.myBill.zipCode)
    cy.get(this.payeePhone).clear().type(this.myBill.phoneNumber)
    cy.get(this.payeeAccount).clear().type(this.myBill.account)
    cy.get(this.payeeVerifyAccount).clear().type(this.myBill.account)
    cy.get(this.payAmmount).clear().type(this.myBill.amount)
}

clickSendPayment(){
    cy.get(this.sendPaymentButton).click()
}

verifyRequiredErrorMessages(){

    cy.get(this.payeeNameError)
        .should('be.visible')
        .should('have.text', 'Payee name is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeAddressError)
        .should('be.visible')
        .should('have.text', 'Address is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeCityError)
        .should('be.visible')
        .should('have.text', 'City is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeStateError)
        .should('be.visible')
        .should('have.text', 'State is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeZipCodeError)
        .should('be.visible')
        .should('have.text', 'Zip Code is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeePhoneError)
        .should('be.visible')
        .should('have.text', 'Phone number is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeAccountEmptyError)
        .should('be.visible')
        .should('have.text', 'Account number is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeVerifyAccountEmptyError)
        .should('be.visible')
        .should('have.text', 'Account number is required.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payAmmountEmptyError)
        .should('be.visible')
        //.should('have.text', 'The amount cannot be empty.\xa0') de investigat
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    
}

verifyInvalidErrorMessages(){

    cy.get(this.payeeAccountInvalidError)
        .should('be.visible')
        .should('have.text', 'Please enter a valid number.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeVerifyAccountInvalidError)
        .should('be.visible')
        .should('have.text', 'Please enter a valid number.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payAmmountInvalidError)
        .should('be.visible')
        .should('have.text', 'Please enter a valid amount.') 
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    
}

triggerInvalidErrorMessages(){
    cy.get(this.payeeAccount).clear().type('abc')
    cy.get(this.payeeVerifyAccount).clear().type('abc')
    cy.get(this.payAmmount).clear().type('abc')
    this.clickSendPayment()
}

triggerMismatchErrorMessages(){
    cy.get(this.payeeAccount).clear().type('123')
    cy.get(this.payeeVerifyAccount).clear().type('321')
    this.clickSendPayment()
}

verifyMismatchErrorMessages(){

    cy.get(this.payeeAccountInvalidError)
        .should('be.visible')
        .should('have.text', 'Please enter a valid number.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    cy.get(this.payeeVerifyAccountInvalidError)
        .should('be.visible')
        .should('have.text', 'Please enter a valid number.')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    
}

}