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

  it('correct info is rendered with existing id', () => {
    cy.visit('/hylyt/1048')
    cy.contains('Storträsket')
    cy.get('table').within(() => {
      cy.get('tbody').contains('Alue')
      cy.get('tbody').contains('Osoite')
      cy.get('tbody').contains('Lisätty')
      cy.get('tbody').contains('Tyyppi')
      cy.get('tbody').contains('Koordinaatit desimaali')
      cy.get('tbody').contains('Koordinaatit dms')
      cy.get('tbody').contains('Koordinaattien tarkkuus')
      cy.get('tbody').contains('Muinaisjäännös')
      cy.get('tbody').contains('Tietolähde')
      cy.get('tbody').contains('Porvoo')
      cy.get('tbody').contains('https://www.kyppi.fi/to.aspx?id=112.1048')
      cy.get('tbody').contains('19.10.2001')
      cy.get('tbody').contains('alusten hylyt')
      cy.get('tbody').contains('25.781138, 60.339694')
      cy.get('tbody').contains("25° 46′ 52.09680″ N 60° 20′ 22.89840″ E")
      cy.get('tbody').contains('ei määritelty')
      cy.get('tbody').contains('ei')
      cy.get('tbody').contains('museovirasto')
    })
  })
  
})