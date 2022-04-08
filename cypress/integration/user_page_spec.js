Cypress.on('uncaught:exception', (err, runnable) => {
  return false
});

describe('user info page e2e tests', () => {
  it('page loads when not logged in', () => {
    cy.visit('/omasivu');
    cy.contains('Kirjaudu sisään ensin');
  });

  it('page loads when logged in', () => {
    cy.visit('/kirjaudu');
    cy.get('[data-testid=username]').type('usernametest');
    cy.get('[data-testid=password]').type('passwordtest');
    cy.get('[data-testid=kirjaudu]').click();
    cy.wait(3000);
    cy.visit('/omasivu');
    cy.contains('Tallenna muutokset');
    cy.contains('Sukellukset kartalla');
    cy.contains('Ilmoitetut hylyt');
    cy.contains('Sukellushistoria');
  });

  it('user can change name', () => {
    cy.visit('/kirjaudu');
    cy.get('[data-testid=username]').clear().type('usernametest');
    cy.get('[data-testid=password]').clear().type('passwordtest');
    cy.get('[data-testid=kirjaudu]').click();
    cy.wait(3000);
    cy.visit('/omasivu');
    cy.get('[data-testid=name]').type('cypress tester')
    cy.get('[data-testid=save]').click();
    cy.contains('Tiedot tallennettu onnistuneesti');
  });

  it('user can phone or email', () => {
    cy.visit('/kirjaudu');
    cy.get('[data-testid=username]').clear().type('usernametest');
    cy.get('[data-testid=password]').clear().type('passwordtest');
    cy.get('[data-testid=kirjaudu]').click();
    cy.wait(3000);
    cy.visit('/omasivu');
    cy.get('[data-testid=phone]').clear().type('1234567890')
    cy.get('[data-testid=save]').click();
    cy.contains('Tiedot tallennettu onnistuneesti');
    cy.get('[data-testid=email]').clear().type('cypress@tester.com')
    cy.get('[data-testid=save]').click();
    cy.contains('Tiedot tallennettu onnistuneesti');
  });
});
