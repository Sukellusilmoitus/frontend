describe('Initial test', () => {
  it('successfully loads', () => {
    cy.visit("/")
    cy.get('h1').should('contain', 'Hylkysukellusilmoituspalvelu');
  });
});
