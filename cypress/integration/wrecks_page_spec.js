describe('UI is correct', () => {
  it('successfully loads', () => {
    cy.visit("/hylyt")
    cy.get('h1').contains('Hylkysukellusilmoituspalvelu')
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

describe('Wreck list is sorted alphabetically', () => {
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

describe('Test form', () => {
  it('locationid is empty before clicked a row', () => {
    cy.get('[id=newlocationid]').should('have.value', '');
  });

  it('locationname is not empty when clicked a row', () => {
    cy.wait(5000);
    cy.scrollTo('top');
    cy.wait(2000);
    cy.get('table tbody').find('tr').first().click();
    cy.get('[id=newlocationname]').should('not.have.value', '')
  });

  it('locationid is not empty when clicked a row', () => {
    cy.wait(5000);
    cy.scrollTo('top');
    cy.wait(2000);
    cy.get('table tbody').find('tr').first().click();
    cy.get('[id=newlocationid]').should('not.have.value', '')
  });

  it('user has to fill in their name', () => {
    cy.get('.btn').click();
    cy.wait(2000);
    cy.get('[id=newname]').then($x => expect($x[0].checkValidity()).to.be.false);
  });

  it('user has to fill in their phone number if email is empty', () => {
    cy.get('[id=newname]').type('Test Tester');
    cy.get('.btn').click();
    cy.wait(2000);
    cy.get('[id=newphone]').then($x => expect($x[0].checkValidity()).to.be.false);
  });

  it('user has to fill in their email if phone number is not given', () => {
    cy.get('.btn').click();
    cy.wait(2000);
    cy.get('[id=newemail]').then($x => expect($x[0].checkValidity()).to.be.false);
  });

  it('locationname cannot be modified by typing', () => {
    cy.get('[id=newlocationname]').type('Wreck 2', { force: true });
    cy.get('[id=newlocationname]').should('not.have.value', 'Wreck 2');
  });

  it('locationid cannot be modified by typing', () => {
    cy.get('[id=newlocationid]').type('000000', { force: true });
    cy.get('[id=newlocationid]').should('not.have.value', '000000');
  });

  // it('user can make make a notice', () => {
  //   cy.get('[id=newphone]').type('0000000000');
  //   cy.get('.btn').click();
  // });
})

