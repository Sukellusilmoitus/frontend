import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserDiveHistory from './UserDiveHistory'

const mockDiveList = [
  {
    id: '1231',
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
        source: 'museovirasto'
      },
      geometry: {
        type: 'Point',
        coordinates: [20.1234567, 62.2345678]
      }
    },
    created_at: '20200202T10:00:00',
    divedate: '20200130T10:00:00',
    location_correction: true,
    new_x_coordinates: '',
    new_y_coordinates: '',
    new_coordinate_explanation: '',
    change_text: 'no changes',
    miscellanious: ''
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
        source: 'museovirasto'
      },
      geometry: {
        type: 'Point',
        coordinates: [20.1234567, 62.2345678]
      }
    },
    created_at: '20200202T10:00:00',
    divedate: '20200130T10:00:00',
    location_correction: true,
    new_x_coordinates: '',
    new_y_coordinates: '',
    new_coordinate_explanation: '',
    change_text: '',
    miscellanious: 'hylky hajalla'
  }
]

describe('user dive history list tests', () => {
  it('renders correct information', () => {
    render(<UserDiveHistory dives={mockDiveList} />)

    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent('Sukellushistoria')

    const diveData = screen.getByTestId('1231')
    expect(diveData).toHaveTextContent('30.01.2020')
    expect(diveData).toHaveTextContent('Hylyn muutokset: no changes')
  })

  it('correct info is rendered with no user dives', () => {
    render(<UserDiveHistory dives={[]} />)

    const diveData = screen.getByTestId('dive-history-list')

    expect(diveData).toHaveTextContent('Ei rekisteröityjä sukelluksia')
  })

  it('renders correctly when change text is omitted', () => {
    render(<UserDiveHistory dives={mockDiveList} />)

    const secondDive = screen.getByTestId('12341')
    expect(secondDive).toHaveTextContent('Hylyn muutokset: ei muutoksia')
    expect(secondDive).toHaveTextContent('Muuta: hylky hajalla')
  })

  it('information about loading is rendered during loading of data', () => {
    render(<UserDiveHistory dives={'loading...'} />)

    const loading = screen.getByTestId('dive-history-list')
    expect(loading).toHaveTextContent('Ladataan')
  })
})
