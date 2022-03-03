describe('search works correctly', () => {
  beforeEach(() => {
    cy.visit('/hylyt')
  })
  it('page contains search form', () => {
    cy.get('#search-form')
  })

  it('targets can be filtered by typing a search query and submitting the search', () => {
    cy.contains('A 37')
    cy.get('#search-form').within(() => {
      cy.get('input#search').type('ilmajoki')
      cy.get('button').click()
    })
    cy.contains('A 37').should('not.exist')
    cy.contains('Ilmajoki')
  })

  it('targets can be filtered by typing a search query and only applying it to name', () => {
    cy.contains('A 37')
    cy.contains('Hangon proomu')
    cy.get('#search-form').within(() => {
      cy.get('input#search').type('han')
      cy.get('button').click()
    })
    cy.contains('A 37')
    cy.contains('Hangon proomu')
    cy.get('#search-form').within(() => {
      cy.get('input#name').click()
      cy.get('button').click()
    })
    cy.contains('A 37').should('not.exist')
    cy.contains('Hangon proomu')
  })

  it('targets can be filtered by typing a search query and only applying it to location', () => {
    cy.contains('Suomenlahti')
    cy.contains('Suomussalmi')
    cy.get('#search-form').within(() => {
      cy.get('input#search').type('suo')
      cy.get('button').click()
    })
    cy.contains('Suomenlahti')
    cy.contains('Suomussalmi')
    cy.get('#search-form').within(() => {
      cy.get('input#location').click()
      cy.get('button').click()
    })
    cy.contains('Suomenlahti').should('not.exist')
    cy.contains('Suomussalmi')
  })

  it('targets can be filtered by typing a search query and only applying it to type', () => {
    cy.contains('alusten hylyt')
    cy.contains('kulkuväylät')
    cy.get('#search-form').within(() => {
      cy.get('input#search').type('kul')
      cy.get('button').click()
    })
    cy.contains('alusten hylyt')
    cy.contains('kulkuväylät')
    cy.get('#search-form').within(() => {
      cy.get('input#type').click()
      cy.get('button').click()
    })
    cy.contains('alusten hylyt').should('not.exist')
    cy.contains('kulkuväylät')
  })

  it('targets can be filtered by typing a search query and only applying it to source', () => {
    cy.contains('Ilmajoki')
    cy.contains('ilmoitus')
    cy.get('#search-form').within(() => {
      cy.get('input#search').type('ilm')
      cy.get('button').click()
    })
    cy.contains('Ilmajoki')
    cy.contains('ilmoitus')
    cy.get('#search-form').within(() => {
      cy.get('input#source').click()
      cy.get('button').click()
    })
    cy.contains('museovirasto').should('not.exist')
    cy.contains('Ilmajoki').should('not.exist')
    cy.contains('ilmoitus')
  })

  it('targets can be filtered by typing a search query and applying it to several attributes', () => {
    cy.contains('A 37')
    cy.get('#search-form').within(() => {
      cy.get('input#search').type('ilm')
      cy.get('button').click()
    })
    cy.contains('Ilmajoki')
    cy.contains('ilmoitus')
    cy.get('#search-form').within(() => {
      cy.get('input#location').click()
      cy.get('input#source').click()
      cy.get('button').click()
    })
    cy.contains('Ilmajoki')
    cy.contains('ilmoitus')
    cy.contains('A 37').should('not.exist')
  })

  it('correct message is shown when no matches are found', () => {
    cy.contains('Kohteita ei löytynyt').should('not.exist')
    cy.get('#search-form').within(() => {
      cy.get('input#search').type('isaquortfhaasdff')
      cy.get('button').click()
    })
    cy.contains('Kohteita ei löytynyt')
  })
})