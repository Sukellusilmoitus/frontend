import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserTargetnotes from './UserTargetnotes'

const mockTargetnoteList = [
  {
    id: '1231',
    diver: {
      name: 'test diver',
      email: 'test@test.com',
      phone: '0501234567',
      username: 'tester'
    },
    target: {
      properties: {
        id: 1231,
        town: 'testville',
        name: 'test target',
        created_at: '2022-02-02',
        type: 'alusten hylyt',
        location_accuracy: '10-100 m',
        url: 'http://testtarget.com',
        is_ancient: true,
        is_pendin: false,
        source: 'ilmoitus'
      },
      geometry: {
        type: 'Point',
        coordinates: [20.1234567, 62.2345678]
      }
    },
    created_at: '20200202T10:00:00',
    miscellaneous: 'vaikeasti nähtävä'
  },
  {
    id: '12341',
    diver: {
      name: 'test diver',
      email: 'test@test.com',
      phone: '0501234567'
    },
    target: {
      properties: {
        id: 1231,
        town: 'testville',
        name: 'test target',
        created_at: '2022-02-02',
        type: 'alusten hylyt',
        location_accuracy: '10-100 m',
        url: 'http://testtarget.com',
        is_ancient: true,
        source: 'ilmoitus',
        is_pending: true
      },
      geometry: {
        type: 'Point',
        coordinates: [20.1234567, 62.2345678]
      }
    },
    created_at: '20200202T10:00:00',
    miscellanious: 'hylky hajalla'
  }
]

describe('user dive history list tests', () => {
  it('renders correct information', () => {
    render(<UserTargetnotes targetnotes={mockTargetnoteList} />)

    const tableRows = screen.getAllByRole('row')
    expect(tableRows[0]).toHaveTextContent(/^IlmoitusTila$/)
    expect(tableRows[1]).toHaveTextContent(/^Nimi:Ilmoitettu:Alue:Koordinaatit:Tarkkuus:Mittaustapa:Tyyppi:Muuta:test target2022-02-02testville20.1234567, 62.234567810-100 malusten hylytvaikeasti nähtäväHyväksytty$/)
  })

  it('correct info is rendered with no user targetnotes', () => {
    render(<UserTargetnotes targetnotes={[]} />)

    const diveData = screen.getByTestId('targetnote-list')

    expect(diveData).toHaveTextContent('Ei ilmoitettuja hylkyjä')
  })

  it('information about loading is rendered during loading of data', () => {
    render(<UserTargetnotes targetnotes={'loading...'} />)

    const loading = screen.getByTestId('user-target-notes')
    expect(loading).toHaveTextContent('Ladataan')
  })
})
