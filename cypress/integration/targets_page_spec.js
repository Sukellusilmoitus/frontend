describe('UI is correct', () => {
  it('successfully loads', () => {
    cy.wait(1000);
    cy.visit("/hylyt")
    cy.wait(1000);
    cy.contains('Hylkysukellusilmoituspalvelu');
    cy.get('table').contains('Nimi');
    cy.get('table').contains('Kaupunki');
    cy.get('table').contains('Tyyppi');
    cy.get('table').contains('Lähde');
  });
  it('source contains a link', () => {
    cy.get('table tbody tr')
      .children()
      .each(($el, $index) => {
        if ($index == 3) {
          expect($el.html()).contains('a');
        }
      });
  });
});

describe('Target list is sorted alphabetically', () => {
  it('sorted', () => {
    let names = [];
    cy.get('table tbody tr')
      .children()
      .each(($el, $index) => {
        if ($index == 0) {
          names.push($el.text());
        }
      });
    expect(names.slice()).to.deep.equal(names.sort());
  });
});
