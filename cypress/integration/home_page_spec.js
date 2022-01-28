describe('Initial test', () => {
  it('successfully loads', () => {
    cy.visit("/")
    cy.get('h1').should('contain', 'Hylkusukellusilmoituspalvelu');
  });
});
  
describe('Test form', () => {
  it('user has to fill in their name', () => {
    cy.get('.btn').click();
    cy.get('[id=newname]').then($x => expect($x[0].checkValidity()).to.be.false);
  });

  it('user has to fill in their phone number', () => {
    cy.get('[id=newname]').type('Test Tester');
    cy.get('.btn').click();
    cy.get('[id=newphone]').then($x => expect($x[0].checkValidity()).to.be.false);
  });

  it('user has to fill in the location', () => {
    cy.get('[id=newphone]').type('0000000000');
    cy.get('.btn').click();
    cy.get('[id=newlocationname]').then($x => expect($x[0].checkValidity()).to.be.false);
  });

  it('user can make make a notice', () => {
    cy.get('[id=newlocationname]').type('Test Tester');
    cy.get('.btn').click();
  });
})
