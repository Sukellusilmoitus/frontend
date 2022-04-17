Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

describe('Target can be clicked', () => {
  it('successfully loads', () => {
    cy.visit('/hylyt');
    cy.get('table tbody').find('tr').first().click();
    cy.contains('Tee uusi sukellusilmoitus');
  });
});
  
describe('Test form fields', () => {
  beforeEach(() => {
    cy.get('[id=newname]').clear();
    cy.get('[id=newphone]').clear();
    cy.get('[id=newemail]').clear();
  })
  it('locationname is not empty on target page', () => {
    cy.get('[id=newlocationname]').should('not.have.value', '')
  });

  it('locationid is not empty on target page', () => {
    cy.get('[id=newlocationid]').should('not.have.value', '')
  });
    
  it('user has to fill in their name', () => {
    cy.get('[id=formbtn]').click();
    cy.contains('Ilmoita sukeltajan nimi!');
  });
    
  it('user has to fill in their phone number if email is empty', () => {
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=formbtn]').click();
    cy.contains('Ilmoita puhelinnumero tai sähköpostiosoite!');
    cy.get('[id=newphone]').type('0001234567');
    cy.get('[id=newemail]').then($x => expect($x[0].checkValidity()).to.be.true);
    cy.get('[id=newphone]').then($x => expect($x[0].checkValidity()).to.be.true);
  });
    
  it('user has to fill in their email if phone number is not given', () => {
    cy.get('[id=newphone]').clear();
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=formbtn]').click();
    cy.contains('Ilmoita puhelinnumero tai sähköpostiosoite!');
    cy.get('[id=newemail]').type('Test@Tester.com');
    cy.get('[id=newemail]').then($x => expect($x[0].checkValidity()).to.be.true);
    cy.get('[id=newphone]').then($x => expect($x[0].checkValidity()).to.be.true);
  });

  it('user has not to fill their phone number if email is given', () => {
    cy.get('[id=newemail]').type('Test@Tester.com');
    cy.get('[id=newphone]').type('000');
    cy.get('[id=newphone]').clear();
    cy.get('[id=newemail]').then($x => expect($x[0].checkValidity()).to.be.true);
    cy.get('[id=newphone]').then($x => expect($x[0].checkValidity()).to.be.true);
  });

  it('user has not to fill their email if phone number is given', () => {
    cy.get('[id=newemail]').clear();
    cy.get('[id=newphone]').type('0001234567');
    cy.get('[id=newemail]').then($x => expect($x[0].checkValidity()).to.be.true);
    cy.get('[id=newphone]').then($x => expect($x[0].checkValidity()).to.be.true);
  });

  it('faulty new coordinates get validated', () => {
    cy.get('[data-testid=testradio2]').click();
    cy.get('[id=newxcoordinate]').type('kissa');
    cy.get('[id=newycoordinate]').type('koira');
    cy.contains('Anna koordinaatti muodossa xx.xxxxxxxx, esim. 25.34234323');
    cy.contains('Anna koordinaatti muodossa xx.xxxxxxxx, esim. 60.42342334');
    cy.get('[id=newxcoordinate]').type('25.1234567');
    cy.contains('Anna koordinaatti muodossa xx.xxxxxxxx, esim. 60.42342334');
  });
});

describe('Diving history is displayed', () => {
  it('history is not empty after posting notif', () => {
    cy.visit('/hylyt');
    cy.get('table tbody').find('tr').first().click();
    cy.contains('Tee uusi sukellusilmoitus');
    cy.reload();
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=newemail]').type('Test@Tester.com');
    cy.get('[id=formbtn]').click();
    cy.wait(2000);
    cy.reload();
    cy.wait(19000);
    cy.get('[data-testid=dive-history-list]').find('div').eq(2).should('contain', 'Sukeltaja: Test Tester');
    cy.get('[data-testid=dive-history-list]').find('div').eq(2).should('contain', 'Muutokset: ei muutoksia');
  });
});


describe('logged and unglogged user tests', () => {
  it('form does not autofill with unlogged user', () => {
    cy.clearLocalStorage();
    cy.visit('/hylyt');
    cy.get('table tbody').find('tr').first().click();
    cy.contains('Tee uusi sukellusilmoitus');
    cy.get('[id=newname]').should("be.visible");
    cy.get('[id=newname]').should('have.value', '');
  });
  it('form autofills when logged in', () => {
    cy.clearLocalStorage();
    cy.visit('/kirjaudu');
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
    expect(localStorage.getItem('auth'));
    cy.visit('/hylyt');
    cy.get('table tbody').find('tr').first().click();
    cy.contains('Tee uusi sukellusilmoitus');
    cy.get('[id=formbtn]').click();
    cy.wait(2000);
    cy.reload();
    cy.wait(19000);
    cy.get('[data-testid=dive-history-list]').find('div').eq(2).should('contain', 'Sukeltaja: usernametest');
    cy.get('[data-testid=dive-history-list]').find('div').eq(2).should('contain', 'Muutokset: ei muutoksia');
  });
});