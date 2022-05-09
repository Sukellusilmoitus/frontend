describe('UI is correct', () => {
  it('successfully loads', () => {
    cy.wait(1000);
    cy.visit("/hylyt")
    cy.wait(1000);
    cy.contains('Sukellusilmoitus');
    cy.get('table').contains('Nimi');
    cy.get('table').contains('Kaupunki');
    cy.get('table').contains('Tyyppi');
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
