const REACT_APP_SERVER_URL = 'https://sukellusilmo-back-test.herokuapp.com';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
});

let auth;

before(function fetchUser () {
  cy.request('POST', `${REACT_APP_SERVER_URL}/api/register/`, {
    name: 'test',
    email: 'test@test.com',
    username: 'usernametest',
    password: 'passwordtest',
  });
  cy.request('POST', `${REACT_APP_SERVER_URL}/api/login/`, {
    username: 'usernametest',
    password: 'passwordtest',
  })
  .its('body')
  .then((res) => {
    auth = res.auth;
  });
});

describe('user info page e2e tests', () => {
  beforeEach(function setUser () {
    cy.visit('/omasivu', {
      onBeforeLoad (win) {
        win.localStorage.setItem('auth', auth);
      },
    });
  });

  it('page loads when logged in', () => {
    cy.contains('Tallenna muutokset');
    cy.contains('Sukellukset kartalla');
    cy.contains('Ilmoitetut hylyt');
    cy.contains('Sukellushistoria');
  });

  it('user can change name', () => {
    cy.get('[data-testid=name]').clear().type('cypress tester')
    cy.get('[data-testid=save]').click();
    cy.contains('Tiedot tallennettu onnistuneesti');
    cy.reload(true);
    cy.wait(1000);
    cy.get('[data-testid=name]').should('have.value', 'cypress tester');
  });

  it('user can change phone or email', () => {
    cy.get('[data-testid=phone]').clear().type('1234567890')
    cy.get('[data-testid=save]').click();
    cy.contains('Tiedot tallennettu onnistuneesti');
    cy.get('[data-testid=email]').clear().type('cypress@tester.com')
    cy.get('[data-testid=save]').click();
    cy.contains('Tiedot tallennettu onnistuneesti');
    cy.reload(true);
    cy.wait(1000);
    cy.get('[data-testid=email]').should('have.value', 'cypress@tester.com');
    cy.get('[data-testid=phone]').should('have.value', '1234567890');
  });
});
