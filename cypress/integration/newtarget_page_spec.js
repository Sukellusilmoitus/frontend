describe('Page can be accessed', () => {
  it('successfully loads', () => {
    cy.visit("/uusi");
    cy.contains('Tee ilmoitus uudesta kohteesta');
  });
});

describe('Test submit', () => {
  it('user can submit', () => {
    cy.visit("/uusi");
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=newdivername]').type('Test Tester');
    cy.get('[id=newemail]').type('tester@test.com');
    cy.get('[id=newphone]').type('0415063434');
    cy.get('[id=newdescription]').type('newdescription');
    cy.get('[id=newlocationname]').type('newlocationname');
    cy.get('[id=newx]').type('25');
    cy.get('[id=newy]').type('60');
    cy.get('[id=newcoordinateinfo]').type('newcoordinateinfo');
    cy.get('[id=newdiverinfo]').type('newdiverinfo');
    cy.contains('Lähetä').click();
    cy.contains('Lomake lähetetty!');
  });

  it('submitted target is not in list before accepted', () => {
    cy.visit("/hylyt");
    cy.contains('Test Tester').should('not.exist');
  });

});

describe('Test form fields', () => {
  it('user has to fill all required fields in the form', () => {
    cy.visit("/uusi");
    cy.get('[id=newphone]').type('0415063434');
    cy.get('[id=newdescription]').type('newdescription');
    cy.get('[id=newlocationname]').type('newlocationname');
    cy.get('[id=newx]').type('25.34234323');
    cy.get('[id=newy]').type('60.42342334');
    cy.get('[id=newcoordinateinfo]').type('newcoordinateinfo');
    cy.get('[id=newdiverinfo]').type('newdiverinfo');
    cy.contains('Lähetä').click();
    cy.contains('Lomakkeesta puuttui tietoja tai siinä on virheitä!');
  });

});

describe('Test email and phone fields', () => {
  it('user has to fill email or phone', () => {
    cy.visit("/uusi");
    cy.get('[id=newname]').type('Test Tester');
    cy.get('[id=newdivername]').type('Test Tester');
    cy.get('[id=newdescription]').type('newdescription');
    cy.get('[id=newlocationname]').type('newlocationname');
    cy.get('[id=newx]').type('25.34234323');
    cy.get('[id=newy]').type('60.42342334');
    cy.get('[id=newcoordinateinfo]').type('newcoordinateinfo');
    cy.get('[id=newdiverinfo]').type('newdiverinfo');
    cy.contains('Lähetä').click();
    cy.contains('Ilmoita puhelinnumero tai sähköpostiosoite!');
  });

});
