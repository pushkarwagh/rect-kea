/// <reference types="cypress" />

describe('example to-do app', () => {
  const a = 'input[type="search" i] '
  it('playground', () => {
    cy.visit('http://localhost:3000')
    cy.get(a).type('Chinua {enter}')
    cy.get('.euiTableRow > .euiButton > .euiButtonContent > .euiButton__text').contains('ADD').click()
    cy.get('.euiButtonEmpty__text').contains('Cancel').click()

    cy.get(':nth-child(1) > .euiPanel').contains('delete').click()
    cy.get('#ib663f9b1-2f5e-11ed-8be6-159827ca4546Title').should("not.exist")

    cy.get('.euiSuperSelectControl').click()
  })
})
