import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TargetPage from '../components/TargetPage'

const mockTarget = {
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
    coordinates: [20.1234567, 62.2345678]
  }
}

describe('target page tests', () => {
  beforeEach(() => {
    render(<TargetPage target={mockTarget} />)
  })
  xit('the component is rendered', () => {
    const title = screen.getAllByRole('heading')[0]

    expect(title).toHaveTextContent('test target')
  })

  xit('info section is rendered with correct data', () => {
    const info = screen.getByRole('table')

    expect(info).toHaveTextContent('testville')

    const tableRows = screen.getAllByRole('row')

    expect(tableRows[0]).toHaveTextContent(/^Kaupunkitestville$/)
    expect(tableRows[1]).toHaveTextContent(/^Osoitehttp:\/\/testtarget.com$/)
    expect(tableRows[2]).toHaveTextContent(/^Lisätty02.02.2022$/)
    expect(tableRows[3]).toHaveTextContent(/^Tyyppialusten hylyt$/)
    expect(tableRows[4]).toHaveTextContent(/^Koordinaatit62.2345678, 20.1234567$/)
    expect(tableRows[5]).toHaveTextContent(/^Koordinaattien tarkkuus10-100 m$/)
  })

  xit('map is rendered', () => {
    const map = screen.getByRole('presentation')
    expect(map).toBeDefined()
  })

  xit('dive form is rendered', () => {
    const form = screen.getByTestId('testform')
    expect(form).toBeDefined()
  })

  xit('divehistory is rendered', () => {
    const history = screen.getAllByRole('heading')[4]
    expect(history).toHaveTextContent('Sukellushistoria')
  })
})