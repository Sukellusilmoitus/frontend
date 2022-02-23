describe('Target can be clicked', () => {
  it('successfully loads', () => {
    cy.visit('/hylyt');
    cy.get('table tbody').find('tr').first().click();
    cy.contains('Tee uusi sukellusilmoitus');
  });
});
  
describe('Test form fields', () => {
  it('locationname is not empty on target page', () => {
    cy.get('[id=newlocationname]').should('not.have.value', '')
  });

  it('locationid is not empty on target page', () => {
    cy.get('[id=newlocationid]').should('not.have.value', '')
  });
    
  it('user has to fill in their name', () => {
    cy.get('.btn').click();
    cy.get('[id=newname]').then($x => expect($x[0].checkValidity()).to.be.false);
  });
    
  it('user has to fill in their phone number if email is empty', () => {
    cy.get('[id=newname]').type('Test Tester');
    cy.get('.btn').click();
    cy.get('[id=newphone]').then($x => expect($x[0].checkValidity()).to.be.false);
  });
    
  it('user has to fill in their email if phone number is not given', () => {
    cy.get('.btn').click();
    cy.get('[id=newemail]').then($x => expect($x[0].checkValidity()).to.be.false);
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

  it('new coordinates are required if answered they were not correct', () => {
    cy.get('[data-testid=testradio]').click();
    cy.get('[id=newxcoordinate]').then($x => expect($x[0].checkValidity()).to.be.false);
    cy.get('[id=newycoordinate]').then($x => expect($x[0].checkValidity()).to.be.false);
  });
});

describe('Diving history is displayed', () => {
  it('history is not empty after posting notif', () => {
    cy.reload();
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=newemail]').type('Test@Tester.com');
    cy.get('.btn').click();
    cy.wait(2000);
    cy.reload();
    cy.wait(3000);
    cy.get('[data-testid=dive-history-list]').find('div').last().should('contain', 'Sukeltaja: Test Tester');
    cy.get('[data-testid=dive-history-list]').find('div').last().should('contain', 'Muutokset: ei muutoksia');
  });
});