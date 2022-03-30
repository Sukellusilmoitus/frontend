Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

describe('Login', () => {
  beforeEach(() => {
    cy.visit('/kirjaudu');
  });

  it('requires username', () => {
    cy.get('[data-testid=password]').type('password');
    cy.get('[data-testid=kirjaudu]').click();
    cy.contains('Väärä käyttäjätunnus tai salasana');
  });

  it('requires password', () => {
    cy.get('[data-testid=username]').type('username');
    cy.get('[data-testid=kirjaudu]').click();
    cy.contains('Väärä käyttäjätunnus tai salasana');
  });

  it('returns auth token when correct credentials', () => {
    cy.contains('Rekisteröidy').click();
    cy.get('[data-testid=username]').type('usernametest');
    cy.get('[data-testid=password]').type('passwordtest');
    cy.get('[data-testid=name]').type('name');
    cy.get('[data-testid=email]').type('email@email.com');
    cy.contains('Rekisteröidy').click();
    cy.visit('/kirjaudu');
    cy.get('[data-testid=username]').type('usernametest');
    cy.get('[data-testid=password]').type('passwordtest');
    cy.get('[data-testid=kirjaudu]').click();
  });
});