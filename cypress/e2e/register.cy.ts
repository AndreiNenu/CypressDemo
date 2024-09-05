import { Register } from "../pageObjects/register"

const register = new Register()

before('', () => {
})

beforeEach('', () => {
    cy.visit('register.htm')
})

after('', () => {
})

describe('Register tests', () => {

it('Check register user with valid data', () => {

    register.getFirstName()
        .type('')


})

})