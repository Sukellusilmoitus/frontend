const { _ } = Cypress
const sort_arrow_asc = '.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-iconDirectionAsc'
const sort_arrow_desc = '.MuiTableSortLabel-root.MuiTableSortLabel-active.MuiTableSortLabel-root.MuiTableSortLabel-active .MuiTableSortLabel-iconDirectionDesc'
const toString = (cells$) => _.map(cells$, 'textContent')
const toNumbers = (id) => _.map(id,Number)

function change_amount_of_rows_per_page (amount) {
  cy.get('.MuiTablePagination-input').click()
  cy.get('.MuiMenu-list').find(`[data-value=${amount}]`).click()
  cy.get('table').within(() => {
    cy.get("td:nth-child(2)").should('have.length',amount)
  })
}

function sort_table_by (title,sortby_data,td_col,order) {
  cy.get('table').within(() => {
    if (order == 'Asc') {
      cy.get("th").contains(title).click()
      cy.contains("th", title)
      .find(sort_arrow_asc).should('be.visible')
      cy.wait(1000)
      cy.get(td_col)
      .then(toNumbers)
      .then(toString)
      .then((sortby_data) => {
        const sorted = _.sortBy(sortby_data).reverse()
        expect(sortby_data, 'sorted').to.deep.equal(sorted)
      })
    } else {
      cy.get("th").contains(title).click()
      cy.get("th").contains(title).click()
      cy.contains("th", title)
      .find(sort_arrow_desc).should('be.visible')

      cy.wait(1000)
      cy.get(td_col)
      .then(toNumbers)
      .then(toString)
      .then((sortby_data) => {
        const sorted = _.sortBy(sortby_data)
        expect(sortby_data, 'sorted').to.deep.equal(sorted)
      })
    }


  })
}

describe('Admin panel', () => {
  context('Target page', () => {
    beforeEach(() => {
      cy.visit('/admin#/targets');
    });
    it('deault 10 targets per page', () => {
      cy.wait(1000);
      cy.get('table').within(() => {
        cy.get("td:nth-child(2)").should('have.length',10)
        
      })})
      it('5 target per page', () => {
        change_amount_of_rows_per_page(5)
      })
    it('25 target per page', () => {
      change_amount_of_rows_per_page(25)
    })
    it('sorts by id Asc', () => {
      sort_table_by('Id','id','td:nth-child(2)','Asc')
    })
    it('sorts by id Desc', () => {
      sort_table_by('Id','id','td:nth-child(2)','Desc')
    })
    it('sorts by name Asc', () => {
      sort_table_by('Name','name','td:nth-child(3)','Asc')
    })
    it('sorts by name Desc', () => {
      sort_table_by('Name','name','td:nth-child(3)','Desc')
    })
    it('sorts by town Asc', () => {
      sort_table_by('Town','town','td:nth-child(4)','Asc')
    })
    it('sorts by town Desc', () => {
      sort_table_by('Town','town','td:nth-child(4)','Desc')
    })
    it('sorts by source Asc', () => {
      sort_table_by('Source','source','td:nth-child(5)','Asc')
    })
    it('sorts by source Desc', () => {
      sort_table_by('Source','source','td:nth-child(5)','Desc')
    })
  })
  context('User page', () => {
    beforeEach(() => {
      cy.visit('/admin#/users');
    });

  })
  context('dives page', () => {
    beforeEach(() => {
      cy.visit('/admin#/dives');
    });

  })
  context('pending targets page', () => {
    beforeEach(() => {
      cy.visit('/admin#/pending');
    });

  })
  context('duplicates targets page', () => {
    beforeEach(() => {
      cy.visit('/admin#/duplicates');
    });

  })
})