Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Register', () => {
  beforeEach(() => {
    cy.visit('/rekisteroidy');
  });

  it('requires name', () => {
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').click();
    cy.contains('Lisää puuttuvat tiedot');
  });

  it('requires phone or email', () => {
    cy.get('[data-testid=name]').type('name');
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').click();
    cy.contains('Lisää puuttuvat tiedot');
  });

  it('requires username', () => {
    cy.get('[data-testid=name]').type('name');
    cy.get('[data-testid=email]').type('email@email.com');
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').click();
    cy.contains('Lisää puuttuvat tiedot');
  });

  it('requires password', () => {
    cy.get('[data-testid=name]').type('name');
    cy.get('[data-testid=email]').type('email@email.com');
    cy.get('[data-testid=username]').type('usernametest1234');
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').click();
    cy.contains('Lisää puuttuvat tiedot');
  });

  it('registers without phone', () => {
    cy.get('[data-testid=name]').type('name');
    cy.get('[data-testid=email]').type('email@email.com');
    cy.get('[data-testid=username]').type('usernametest1234');
    cy.get('[data-testid=password]').type('password');
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').click();
    cy.url().should('include', '/kirjaudu');
  });

  it('registers without email', () => {
    cy.get('[data-testid=name]').type('name');
    cy.get('[data-testid=phone]').type('1111111111');
    cy.get('[data-testid=username]').type('usernametest1234');
    cy.get('[data-testid=password]').type('password');
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').click();
    cy.url().should('include', '/kirjaudu');
  });

  it('registers with email and phone', () => {
    cy.get('[data-testid=name]').type('name');
    cy.get('[data-testid=phone]').type('1111111111');
    cy.get('[data-testid=email]').type('email@email.com');
    cy.get('[data-testid=username]').type('usernametest1234');
    cy.get('[data-testid=password]').type('password');
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').click();
    cy.url().should('include', '/kirjaudu');
  });

  it('privacy terms have to accepted', () => {
    cy.contains('Rekisteröidy').should('be.disabled')
    cy.get('[id=privacy-checkbox]').click();
    cy.contains('Rekisteröidy').should('not.be.disabled')
  })
});
