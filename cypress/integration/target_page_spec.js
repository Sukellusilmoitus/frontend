Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('target page tests', () => {
  describe('page content tests', () => {
    beforeEach(() => {
      cy.visit('/hylyt/1957')
    })
    it('form has target info prefilled', () => {
      cy.contains('Aevo').click()
      cy.get('form').within(() => {
        cy.get('#newlocationname').should('have.value', 'Aevo')
        cy.get('#newlocationid').should('have.value', '1957')
      })
    })
  
    it('map has a marker with target name', () => {
      cy.get('.leaflet-container').within(() => {
        cy.get('.leaflet-marker-icon').click()
        cy.get('.leaflet-popup').contains('Aevo')
      })
    })
  })

  it('target page is reached by clicking a target from target list', () => {
    cy.visit('/hylyt')
    cy.contains('Achill').click()
    cy.contains('Achill')
    cy.contains('Tietoja')
    cy.contains('Sijainti kartalla')
    cy.url().should('include', '/hylyt/2596')
  })
  
  it('correct info is rendered with non-existing id', () => {
    cy.visit('/hylyt/XXXXXXXXXXX')
    cy.contains('Kyseisellä id:llä ei löytynyt yhtään kohdetta, onhan käyttämäsi osoite oikea?')
  })
  
})