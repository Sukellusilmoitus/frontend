import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserPage from './UserPage'

const mockUser = {
    name: 'Do Doer',
    username: 'doer',
    password: 'verydifficultHash123',
    email: 'doer@test.com',
    phone: '000001111'
}

const createNewNotification = jest.fn()

const dives = []

const targetnotes = []

describe('user page tests', () => {
  beforeEach(() => {
    render(
      <UserPage
        user={mockUser}
		targetnotes={targetnotes}
        dives={dives}
      />
    )
  })

  it('the component is rendered', () => {
    const title = screen.getAllByRole('heading')[0]

    expect(title).toHaveTextContent('Do Doer')
  })

  it('info section is rendered with correct data', () => {
    const info = screen.getByTestId('testinfotable')

    expect(info).toHaveTextContent('doer')
  })

  it('map is rendered', () => {
    const map = screen.getByRole('presentation')
    expect(map).toBeDefined()
  })

  it('divehistory is rendered', () => {
    const history = screen.getAllByRole('heading')[3]
    expect(history).toHaveTextContent('Sukellushistoria')
  })
})
