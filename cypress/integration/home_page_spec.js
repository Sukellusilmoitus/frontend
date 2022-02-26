Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Initial test', () => {
  it('successfully loads', () => {
    cy.visit("/")
    cy.contains('Hylkysukellusilmoituspalvelu');
  });
});

describe('home page tests', () => {
  describe('main map tests', () => {
    it('map has a legend', () => {
      cy.get('.leaflet-container').within(() => {
        cy.get('.leaflet-control-layers-expanded').contains('Museovirasto')
        cy.get('.leaflet-control-layers-expanded').contains('Käyttäjän ilmoitus')
      })
    })

    it('map legend has visible marker images', () => {
      cy.get('.leaflet-container').within(() => {
        cy.get('[alt="user created marker"]').should('be.visible')
        cy.get('[alt="agency confirmed marker"]').should('be.visible')
      })
    })
    
    it('map has three layers', () => {
      cy.get('.leaflet-container').within(() => {
        cy.get('.leaflet-control-layers-list').contains('OpenStreetMap')
        cy.get('.leaflet-control-layers-list').contains('Merimerkit')
        cy.get('.leaflet-control-layers-list').contains('Satelliitti')
      })
    })

    it('default base layer shown is OpenStreetMap', () => {
      cy.get('.leaflet-container').within(() => {
        cy.get('.leaflet-tile-container')
        .find('img')
        .should('have.attr', 'src')
        .and('contains', 'openstreetmap')
      })
    })

    it('base layer can be changed to satellite map', () => {
      cy.get('.leaflet-container').within(() => {
        cy.get('.leaflet-control-layers').trigger('mouseover')
        cy.get('.leaflet-control-layers-list').contains('Satelliitti').click()
        cy.get('.leaflet-tile-container')
        .find('img')
        .should('have.attr', 'src')
        .and('contains', 'World_Imagery')
      })
    })
    
    // Tämä testi toimii kun J-P:n tekemät muutokset popup:iin mergetään
    // it('marker popup has id and name strings', () => {
    //   const regex = new RegExp(`.+`)
    //   cy.get('.leaflet-marker-pane').within(() => {
    //     cy.get('.leaflet-marker-icon').first().click()
    //   })
    //   cy.get('.leaflet-marker-pane').find('img').first().click()
    //   cy.get('.leaflet-popup-pane').within(() => {
    //     cy.get('.leaflet-popup-content').find('h6').eq(0).contains(regex)
    //     cy.get('.leaflet-popup-content').find('h6').eq(1).contains(regex)
    //   })
    // })
  })
})