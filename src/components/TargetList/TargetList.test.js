import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TargetList from './TargetList'

const mockTargets = [
  {
    properties: {
      id: 123,
      town: 'testville',
      name: 'test target',
      created_at: '2022-02-02',
      type: 'alusten hylyt',
      location_accuracy: '10-100 m',
      url: 'http://testtarget.com',
      is_ancient: true,
      source: 'museovirasto'
    },
    geometry: {
      type: 'Point',
      coordinates: [62.2345678, 20.1234567]
    }
  }
]

const onRowClick = jest.fn()

describe('target list tests', () => {
  it('correct message is shown with no targets', () => {
    render(<TargetList onRowClick={onRowClick} targets={[]} />)
    const list = screen.getByTestId('target-list')
    expect(list).toHaveTextContent('Kohteita ei löytynyt')
  })

  it('targets are rendered into a table', () => {
    render(<TargetList onRowClick={onRowClick} targets={mockTargets} />)
    screen.getByRole('table')
    const headers = screen.getAllByRole('columnheader')
    expect(headers[0]).toHaveTextContent('Nimi')
    expect(headers[1]).toHaveTextContent('Kaupunki')
    expect(headers[2]).toHaveTextContent('Tyyppi')
    expect(headers[3]).toHaveTextContent('Lähde')
    const cells = screen.getAllByRole('cell')
    expect(cells[0]).toHaveTextContent('test target')
    expect(cells[1]).toHaveTextContent('testville')
  })

  it('clicking a row calls the function to open that row', () => {
    render(<TargetList onRowClick={onRowClick} targets={mockTargets} />)
    screen.getAllByRole('row')[1].click()
    expect(onRowClick).toHaveBeenCalled()
  })
})