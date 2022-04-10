import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TargetInfo from './TargetInfo'

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
  },
  {
    properties: {
      id: 123,
      town: 'testville',
      name: 'test target',
      created_at: '2022-02-02',
      type: 'alusten hylyt',
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

describe('target info table tests', () => {
  it('correct information is rendered', () => {
    render(<TargetInfo target={mockTargets[0]} />)

    const info = screen.getByRole('table')
    expect(info).toHaveTextContent('testville')

    const tableRows = screen.getAllByRole('row')
    expect(tableRows[0]).toHaveTextContent(/^Aluetestville$/)
    expect(tableRows[1]).toHaveTextContent(/^Osoitehttp:\/\/testtarget.com$/)
    expect(tableRows[2]).toHaveTextContent(/^Lisätty02.02.2022$/)
    expect(tableRows[3]).toHaveTextContent(/^Tyyppialusten hylyt$/)
    expect(tableRows[4]).toHaveTextContent(/^Koordinaatit desimaali62.2345678, 20.1234567$/)
    expect(tableRows[6]).toHaveTextContent(/^Koordinaattien tarkkuus10-100 m$/)
    expect(tableRows[7]).toHaveTextContent(/^Muinaisjäännöskyllä$/)
    expect(tableRows[8]).toHaveTextContent(/^Tietolähdemuseovirasto$/)
  })

  it('if accuracy is not defined, the components fallbacks correctly', () => {
    render(<TargetInfo target={mockTargets[1]} />)

    const accuracy = screen.getByText('ei määritelty')
    expect(accuracy).toBeDefined()

    const tableRows = screen.getAllByRole('row')
    expect(tableRows[6]).toHaveTextContent(/^Koordinaattien tarkkuusei määritelty$/)

  })
})