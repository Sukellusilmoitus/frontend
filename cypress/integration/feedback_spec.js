Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('feedback page e2e tests', () => {
  it('page succesfully loads', () => {
    cy.visit('/palaute')
    cy.contains('Anna palautetta')
  })

  it('form can be submitted', () => {
    cy.visit('/palaute')
    cy.get('form').within(() => {
      cy.get('textarea').type('cypress feedback')
      cy.get('[name=name]').type('cypress tester')
      cy.get('[name=email]').type('test@cypress.com')
      cy.get('[name=phone]').type('0501234567')
      cy.get('button').click()
    })
  })

  it('empty form cannot be submitted', () => {
    cy.visit('/palaute')
    cy.get('form').within(() => {
      cy.get('button').click()
    })
    cy.contains('Palaute on pakollinen kenttä')
  })
})