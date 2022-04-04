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
  cy.viewport(2048,1080)
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
function add_dive (
  name,
  diver_email,
  diver_phone,
  target_id,
  location_correct,
  new_x_coordinate,
  new_y_coordinate,
  new_location_explanation,
  change_text,
  miscellaneous) {
    cy.request('POST','http://127.0.0.1:5000/api/dives', {
      name:name,
      email:diver_email,
      phone:diver_phone,
      locationId:target_id,
      locationCorrect:location_correct,
      xCoordinate:new_x_coordinate,
      yCoordinate:new_y_coordinate,
      coordinateText:new_location_explanation,
      changeText:change_text,
      miscText:miscellaneous,
    })
}

function setupDb () {
  add_dive('sami sukeltaa','sami@gmail.com','34362728354','1000028223','True','','','','masto rikki','')
  add_dive('matti sukeltaa','sami@gmail.com','04003725583','1957','True','','','','','')
  add_dive('matti mallikas','','04437594752','1091','True','','','','masto poikki','')
  add_dive('sami sukeltaa','sami@gmail.com','045274356583','1388','True','','','','hylkyyn tullut reikä','hieno hylky')
  add_dive('sami sukeltaa','sami@gmail.com','34362728354','1000028223','True','','','','masto rikki','')
  add_dive('mikko sukeltaa','mikko@gmail.com','04003725583','1957','True','','','','','')
  add_dive('sari saari','','033859363','1091','True','','','','masto poikki','')
  add_dive('testi testaaja','','045274356583','1388','True','','','','hylkyyn tullut reikä','hieno hylky')
  add_dive('testi testaaja2','','34362728354','1000028223','True','','','','masto rikki','')
  add_dive('testi sukeltaa','testi@gmail.com','','1957','True','','','','','')
  add_dive('matti mallikas','','045382956382','1091','True','','','','masto poikki','')
  add_dive('sami sukeltaa','sami@gmail.com','045274356583','1388','True','','','','','hieno keli oli sukeltaa')
}
describe('Admin panel', () => {
  // it('setup database', () => {
  //   setupDb()
  // })
  context('Target page', () => {
    beforeEach(() => {
      cy.visit('/admin#/targets');
    });
    context('Rows per page', () => {
      it('deault 10 targets per page', () => {
        cy.wait(3000);
        cy.get('table').within(() => {
          cy.get("td:nth-child(2)").should('have.length',10)
          
        })})
        it('5 target per page', () => {
          change_amount_of_rows_per_page(5)
        })
      it('25 target per page', () => {
        change_amount_of_rows_per_page(25)
      })
    })
    context('Sorting', () => {
      it('sort by id Asc', () => {
        sort_table_by('Id','id','td:nth-child(2)','Asc')
      })
      it('sort by id Desc', () => {
        sort_table_by('Id','id','td:nth-child(2)','Desc')
      })
      it('sort by name Asc', () => {
        sort_table_by('Name','name','td:nth-child(3)','Asc')
      })
      it('sort by name Desc', () => {
        sort_table_by('Name','name','td:nth-child(3)','Desc')
      })
      it('sort by town Asc', () => {
        sort_table_by('Town','town','td:nth-child(4)','Asc')
      })
      it('sort by town Desc', () => {
        sort_table_by('Town','town','td:nth-child(4)','Desc')
      })
      it('sort by source Asc', () => {
        sort_table_by('Source','source','td:nth-child(5)','Asc')
      })
      it('sort by source Desc', () => {
        sort_table_by('Source','source','td:nth-child(5)','Desc')
      })
    })
  })
  context('User page', () => {
    beforeEach(() => {
      cy.visit('/admin#/users');
    });
    context('Rows per page', () => {

    })
    context('Sorting', () => {

    })
  })
  context('dives page', () => {
    beforeEach(() => {
      cy.visit('/admin#/dives');
    });
    context('Rows per page', () => {

    })
    context('Sorting', () => {
      it('sort by id Asc', () => {
        sort_table_by('Id','id','td:nth-child(2)','Asc')
      })
      it('sort by id Desc', () => {
        sort_table_by('Id','id','td:nth-child(2)','Desc')
      })
      it('sort by diver Asc', () => {
        sort_table_by('Diver','diver','td:nth-child(3)','Asc')
      })
      it('sort by diver Desc', () => {
        sort_table_by('Diver','diver','td:nth-child(3)','Desc')
      })
      it('sort by target Asc', () => {
        sort_table_by('Target','target','td:nth-child(4)','Asc')
      })
      it('sort by target Desc', () => {
        sort_table_by('Target','target','td:nth-child(4)','Desc')
      })
      it('sort by created at ASC', () => {
        sort_table_by('Created at','created at','td:nth-child(5)','Asc')
      })
      it('sort by created at Desc', () => {
        sort_table_by('Created at','created at','td:nth-child(5)','Desc')
      })
      it('sort by location correct Asc', () => {
        sort_table_by('Location correct','location correct','td:nth-child(6)','Asc')
      })
      it('sort by location correct Desc', () => {
        sort_table_by('Location correct','location correct','td:nth-child(6)','Desc')
      })
      it('sort by new x coordinates Asc', () => {
        sort_table_by('New x coordinate','new x coordinate','td:nth-child(7)','Asc')
      })
      it('sort by new x coordinate Desc', () => {
        sort_table_by('New x coordinate','new x coordinate','td:nth-child(7)','Desc')
      })
      it('sort by new y coordinate Asc', () => {
        sort_table_by('New y coordinate','new y coordinate','td:nth-child(8)','Asc')
      })
      it('sort by new y coordinate Desc', () => {
        sort_table_by('New y coordinate','new y coordinate','td:nth-child(8)','Desc')
      })
      it('sort by change text Asc', () => {
        sort_table_by('Change text','change text','td:nth-child(9)','Asc')
      })
      it('sort by change text Desc', () => {
        sort_table_by('Change text','change text','td:nth-child(9)','Desc')
      })
      it('sort by miscellaneous Asc', () => {
        sort_table_by('Miscellaneous','miscellaneous','td:nth-child(10)','Asc')
      })
      it('sort by miscellaneous Desc', () => {
        sort_table_by('Miscellaneous','miscellaneous','td:nth-child(10)','Desc')
      })
    })
  })
  context('pending targets page', () => {
    beforeEach(() => {
      cy.visit('/admin#/pending');
    });
    context('Rows per page', () => {

    })
    context('Sorting', () => {
      
    })
  })
  context('duplicates targets page', () => {
    beforeEach(() => {
      cy.visit('/admin#/duplicates');
    });
    context('Rows per page', () => {

    })
    context('Sorting', () => {
      
    })
  })
})