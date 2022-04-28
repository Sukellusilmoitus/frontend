import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DiveHistory from './DiveHistory'

const mockDiveList = [
  {
    id: '123',
    diver: {
      name: 'test diver',
      email: 'test@test.com',
      phone: '0501234567'
    },
    target: {
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
    },
    created_at: '20200202T10:00:00',
    divedate: '20200201T10:00:00',
    location_correction: true,
    new_x_coordinates: '',
    new_y_coordinates: '',
    new_coordinate_explanation: '',
    change_text: 'no changes',
    miscellaneous: ''
  },
  {
    id: '1234',
    diver: {
      name: 'test diver',
      email: 'test@test.com',
      phone: '0501234567'
    },
    target: {
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
    },
    created_at: '20200202T10:00:00',
    divedate: '20200201T10:00:00',
    location_correction: true,
    new_x_coordinates: '',
    new_y_coordinates: '',
    new_coordinate_explanation: '',
    change_text: '',
    miscellaneous: ''
  }
]

describe('dive history list tests', () => {
  it('renders correct information', () => {
    render(<DiveHistory diveList={mockDiveList} />)

    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent('Sukellushistoria')

    const diveData = screen.getByTestId('123')
    expect(diveData).toHaveTextContent('01.02.2020')
    expect(diveData).toHaveTextContent('Sukeltaja: test diver')
    expect(diveData).toHaveTextContent('Muutokset: no changes')
  })

  it('correct info is rendered with no dives', () => {
    render(<DiveHistory diveList={[]} />)

    const diveData = screen.getByTestId('dive-history-list')

    expect(diveData).toHaveTextContent('Ei rekisteröityjä sukelluksia')
  })

  it('renders correctly when change text is omitted', () => {
    render(<DiveHistory diveList={mockDiveList} />)

    const secondDive = screen.getByTestId('1234')
    expect(secondDive).toHaveTextContent('Muutokset: ei muutoksia')
  })

  it('information about loading is rendered during loading of data', () => {
    render(<DiveHistory diveList={'loading...'} />)

    const loading = screen.getByTestId('dive-history-list')
    expect(loading).toHaveTextContent('Ladataan')
  })
})