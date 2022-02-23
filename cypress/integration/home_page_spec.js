describe('Initial test', () => {
  it('successfully loads', () => {
    cy.visit("/")
    cy.contains('Hylkysukellusilmoituspalvelu');
  });
});
