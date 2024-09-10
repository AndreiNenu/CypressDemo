import { Dictionary, NumericDictionary } from "cypress/types/lodash";

export class Overview{

    //declarations
    tableHeadElements = ['Account', 'Balance*', 'Available Amount']
    tableBodyElements = []
    tableFootElements = ['*Balance includes deposits that may be subject to holds']

    //locator fields
    overviewPageTitle = "#showOverview > .title"
    overviewTableHead = "table[id='accountTable'] > thead > tr > th"
    overviewTableBody = "table[id='accountTable'] > tbody > tr > td"
    overviewTableFoot = "table[id='accountTable'] > tfoot > tr > td"
    
    //functions
    getOverviewPageTitle(){
        return cy.get(this.overviewPageTitle)
    }

    // checkTableHeadData(){
    //     cy.get(this.overviewTableHead)
    //         .then(($elem) => {
    //            const texts = Cypress._.map($elem, 'innerText')
    //            expect(texts, 'tableHeadElements').to.deep.equal(this.tableHeadElements)
    //         })
        
    // }


    checkTableHeadData(){
        cy.get(this.overviewTableHead)
            .each(($elem, index) => {
                const getText = $elem.text()
                expect(getText).to.deep.equal(this.tableHeadElements[index])
            } )
    }

    // checkTableHeadData(){
    //     cy.get(this.overviewTableHead)
    //         .each(($elem, index) => {
    //             cy.wrap($elem)
    //             .getText($elem)
    //             .should('deep.equal', this.tableHeadElements[index])
    //         } )
    // }

    checkTableFootData(){
        cy.get(this.overviewTableFoot)
            .should('be.visible')
            .and('have.text', this.tableFootElements[0])
    }

    checkTable(){
        cy.get("#accountTable")
            .should('be.visible')
    }

}   

