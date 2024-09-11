import { Dictionary, NumericDictionary } from "cypress/types/lodash";

export class Overview{

    //declarations
    tableHeadElements = ['Account', 'Balance*', 'Available Amount']
    tableBodyElements: any[] = [
        ''     , '$5000.00', '$5000.00',
        'Total', '$5000.00', '\xa0'       //// Non-breakable space is char 0xa0 (160 dec)
    ]
    tableFootElements = ['*Balance includes deposits that may be subject to holds']

    //locators fields
    overviewPageTitle = "#showOverview > .title"
    overviewTableHead = "table[id='accountTable'] > thead > tr > th"
    overviewTableBody = "table[id='accountTable'] > tbody > tr > td"
    overviewTableFoot = "table[id='accountTable'] > tfoot > tr > td"
    overviewTableUsers = "table[id='accountTable'] > tbody > tr >td:nth-child(1)"
    
    //functions
    checkOverviewPageTitle(){
        cy.get(this.overviewPageTitle)
            .should('be.visible')
            .and('have.text', '\n\t\t\tAccounts Overview\n\t\t')
    }

    checkTable(){
        cy.get("#accountTable")
            .should('be.visible')
    }

    checkTableHeadData(){
        cy.get(this.overviewTableHead)
            .each(($elem, index) => {
                const getText = $elem.text()
                expect(getText).to.deep.equal(this.tableHeadElements[index])
            })
    }

    checkTableBodyData(){
        cy.get(this.overviewTableBody)
            .each(($elem, index) => {
                const getText = $elem.text()
                if(index % 3 === 0){
                    this.tableBodyElements[index] = getText
                }
                expect(getText).to.deep.equal(this.tableBodyElements[index])
            } )
    }

    checkTableFootData(){
        cy.get(this.overviewTableFoot)
            .should('be.visible')
            .and('have.text', this.tableFootElements[0])
    }

    // Different implementations of same functionality

    // checkTableHeadData(){
    //     cy.get(this.overviewTableHead)
    //         .then(($elem) => {
    //            const texts = Cypress._.map($elem, 'innerText')
    //            expect(texts, 'tableHeadElements').to.deep.equal(this.tableHeadElements)
    //         })
        
    // }

    // checkTableHeadData(){
    //     cy.get(this.overviewTableHead)
    //         .each(($elem, index) => {
    //             cy.wrap($elem)
    //             .getText($elem)
    //             .should('deep.equal', this.tableHeadElements[index])
    //         } )
    // }

}   

