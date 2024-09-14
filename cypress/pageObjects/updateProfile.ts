import { User, User2 } from "../interfaces/user"

export class UpdateProfile{

    //locator fields
    firstName = 'input[id="customer\\.firstName"]'
    lastName = 'input[id="customer\\.lastName"]'
    address = 'input[id="customer\\.address.street"]'
    city = 'input[id="customer\\.address.city"]'
    state = 'input[id="customer\\.address.state"]'
    zipCode = 'input[id="customer\\.address.zipCode"]'
    phoneNumber = 'input[id="customer\\.phoneNumber"]'
    updateProfileButton = 'input[value="Update Profile"]'
    profileUpdatedTitle = "#updateProfileResult > .title"
    profileUpdatedMessage = "#updateProfileResult > p"

    
    //error fields
    firstNameError = '#firstName-error'
    lastNameError = '#lastName-error'
    addressError = '#street-error'
    cityError = '#city-error'
    stateError = '#state-error'
    zipCodeError = '#zipCode-error'

    myProfile: User2 ={
        firstName: 'John',
        lastName: 'Lenon',
        address: 'Liberty Street', 
        city: 'Texas',
        state: 'Texas',
        zipCode: '505291',
        phoneNumber: '0721123753'
    }

    //functions

    updateContactInfo(){
        cy.get(this.firstName).clear().type(this.myProfile.firstName)
        cy.get(this.lastName).clear().type(this.myProfile.lastName)
        cy.get(this.address).clear().type(this.myProfile.address)
        cy.get(this.city).clear().type(this.myProfile.city)
        cy.get(this.state).clear().type(this.myProfile.state)
        cy.get(this.zipCode).clear().type(this.myProfile.zipCode)
        cy.get(this.phoneNumber).clear().type(this.myProfile.phoneNumber)

        cy.get(this.updateProfileButton).click()
    }

    validateUpdateOfContactInfo(){
        cy.get(this.profileUpdatedTitle)
            .should('be.visible')
            .and('have.text', 'Profile Updated')

        cy.get(this.profileUpdatedMessage)
            .should('be.visible')
            .and('have.text', 'Your updated address and phone number have been added to the system. ')

        return this
    }

}