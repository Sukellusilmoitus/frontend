const { _ } = Cypress
const sort_arrow_asc = '.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-iconDirectionAsc'
const sort_arrow_desc = '.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-iconDirectionDesc'
const toString = (cells$) => _.map(cells$, 'textContent')
const toNumbers = (id) => _.map(id,Number)

describe('Admin panel', () => {
  context('Target page', () => {
    beforeEach(() => {
      cy.visit('/admin#/targets');
    });
    it('deault 10 targets per page', () => {
      cy.wait(1000);
      cy.get('table').within(() => {
        const ids = [];
        cy.get("td:nth-child(2)").each(($e1, index, $list) => {
          ids.push($e1.text());
          // console.log(ids)
        })
        cy.get("td:nth-child(2)").should('have.length',10)
        
      })})
    it('sorts by name Asc', () => {
      cy.get('table').within(() => {
      cy.get("th").contains("Name").click()
      cy.contains("th", "Name")
      .find(sort_arrow_asc).should('be.visible')
      
      
      cy.wait(1000)
      cy.get('td:nth-child(3)')
      .then(toString)
      .then((name) => {
        const sorted = _.sortBy(name).reverse()
        expect(name, 'sorted').to.deep.equal(sorted)
      })
    })
    })
    it('sorts by name Desc', () => {
      cy.get('table').within(() => {
      cy.get("th").contains("Name").click()
      cy.get("th").contains("Name").click()
      cy.contains("th", "Name")
      .find(sort_arrow_desc).should('be.visible')
      
      cy.wait(1000)
      cy.get('td:nth-child(3)')
      .then(toString)
      .then((name) => {
        const sorted = _.sortBy(name)
        expect(name, 'sorted').to.deep.equal(sorted)
      })
    })
  })
  it('sorts by id Asc', () => {
    cy.get('table').within(() => {
    cy.get("th").contains("Id").click()
    cy.contains("th", "Id")
    .find(sort_arrow_asc).should('be.visible')
    
    cy.wait(1000)
    cy.get('td:nth-child(2)')
    .then(toNumbers)
    .then((id) => {
      const sorted = _.sortBy(id).reverse()
      expect(id, 'sorted').to.deep.equal(sorted)
    })
  })
})
it('sorts by id Desc', () => {
  cy.get('table').within(() => {
  cy.get("th").contains("Id").click()
  cy.get("th").contains("Id").click()
  cy.contains("th", "Id")
  .find(sort_arrow_desc).should('be.visible')
  
  cy.wait(1000)
  cy.get('td:nth-child(2)')
  .then(toNumbers)
  .then((id) => {
    const sorted = _.sortBy(id)
    expect(id, 'sorted').to.deep.equal(sorted)
  })
})
})
it('sorts by town Asc', () => {
  cy.get('table').within(() => {
  cy.get("th").contains("Town").click()
  cy.contains("th", "Town")
  .find(sort_arrow_asc).should('be.visible')
  
  cy.wait(1000)
  cy.get('td:nth-child(4)')
  .then(toString)
  .then((town) => {
    const sorted = _.sortBy(town).reverse()
    expect(town, 'sorted').to.deep.equal(sorted)
  })
})
})
it('sorts by town Desc', () => {
  cy.get('table').within(() => {
  cy.get("th").contains("Town").click()
  cy.get("th").contains("Town").click()
  cy.contains("th", "Town")
  .find(sort_arrow_desc).should('be.visible')
  
  cy.wait(1000)
  cy.get('td:nth-child(4)')
  .then(toString)
  .then((town) => {
    const sorted = _.sortBy(town)
    
    expect(town, 'sorted').to.deep.equal(sorted)
  })
})
})
///
it('sorts by source Asc', () => {
  cy.get('table').within(() => {
  cy.get("th").contains("Source").click()
  cy.contains("th", "Source")
  .find(sort_arrow_asc).should('be.visible')
  
  cy.wait(1000)
  cy.get('td:nth-child(5)')
  .then(toString)
  .then((source) => {
    const sorted = _.sortBy(source).reverse()
    expect(source, 'sorted').to.deep.equal(sorted)
  })
})
})
it('sorts by source Desc', () => {
  cy.get('table').within(() => {
  cy.get("th").contains("Source").click()
  cy.get("th").contains("Source").click()
  cy.contains("th", "Source")
  .find(sort_arrow_desc).should('be.visible')
  
  cy.wait(1000)
  cy.get('td:nth-child(5)')
  .then(toString)
  .then((source) => {
    const sorted = _.sortBy(source)
    expect(source, 'sorted').to.deep.equal(sorted)
  })
})
})
  })
  context('User page', () => {

  })
  context('dives page', () => {

  })
  context('pending targets', () => {

  })
  context('overlap targets page', () => {

  })
})