describe('Wreck can be clicked', () => {
  it('successfully loads', () => {
    cy.visit("/hylyt");
    cy.get('table tbody').find('tr').first().click();
    cy.contains('Tee uusi sukellusilmoitus');
  });
});

describe('Test form', () => {
  /*it('locationid is empty before clicked a row', () => {
    cy.get('[id=newlocationid]').should('have.value', '');
  });
  
  it('locationname is not empty when clicked a row', () => {
    cy.wait(5000);
    cy.scrollTo('top');
    cy.wait(2000);
    cy.get('table tbody').find('tr').first().click();
    cy.get('[id=newlocationname]').should('not.have.value', '')
  });*/
  
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
});
