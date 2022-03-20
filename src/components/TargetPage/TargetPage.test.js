import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TargetPage from './TargetPage'

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

const createNewNotification = jest.fn()

const dives = []

describe('target page tests', () => {
  beforeEach(() => {
    render(
      <TargetPage
        target={mockTarget}
        createNewNotification={createNewNotification}
        dives={dives}
      />
    )
  })

  it('the component is rendered', () => {
    const title = screen.getAllByRole('heading')[0]

    expect(title).toHaveTextContent('test target')
  })

  it('info section is rendered with correct data', () => {
    const info = screen.getByRole('table')

    expect(info).toHaveTextContent('testville')
  })

  it('map is rendered', () => {
    const map = screen.getByRole('presentation')
    expect(map).toBeDefined()
  })

  it('dive form is rendered', () => {
    const form = screen.getByTestId('testform')
    expect(form).toBeDefined()
  })

  it('divehistory is rendered', () => {
    const history = screen.getAllByRole('heading')[4]
    expect(history).toHaveTextContent('Sukellushistoria')
  })
})