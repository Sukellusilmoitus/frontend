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

    /* cant locate tile container

    it('default base layer shown is OpenStreetMap', () => {
      cy.get('.leaflet-container').within(() => {
        cy.get('.leaflet-tile-container')
        .find('img')
        .should('have.attr', 'src')
        .and('contains', 'openstreetmap')
      })
    })
    
    */

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
    
    it('marker popup has id and name strings', () => {
      const regex = new RegExp(`.+`)
      cy.get('.leaflet-marker-pane').within(() => {
        cy.get('.leaflet-marker-icon').first().click()
      })
      cy.get('.leaflet-marker-pane').find('img').first().click()
      cy.get('.leaflet-popup-pane').within(() => {
        cy.get('.leaflet-popup-content').find('h6').eq(0).contains(regex)
        cy.get('.leaflet-popup-content').find('h6').eq(1).contains(regex)
      })
    })

    it('marker popup has a button that redirects to the wreck page', () => {
      cy.get('.leaflet-popup-pane').within(() => {
        cy.get('.leaflet-popup-content').then(($text) => {
          let id = $text.find('h6').eq(0).text();
          //cy.log(_id.split(':')[1])
          id = id.split(':')[1]
          cy.get('.leaflet-popup-content').find('button').click({force: true});
          cy.url().should('include', `/hylyt/${id}`)
        })
      })
    });
  })
})