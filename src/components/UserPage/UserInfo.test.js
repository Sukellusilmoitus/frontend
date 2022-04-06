import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserInfo from './UserInfo'

const mockUser = 
  {
    name: 'Do Doer',
    username: 'doer',
    password: 'verydifficultHash123',
    email: 'doer@test.com',
    phone: '000001111'
  }


describe('user info table tests', () => {
  it('correct information is rendered', () => {
    render(<UserInfo user={mockUser} />)

    const tableRows = screen.getAllByRole('row')
    expect(tableRows[0]).toHaveTextContent(/^Käyttäjänimidoer$/)
    expect(tableRows[1]).toHaveTextContent(/^Emaildoer@test.com$/)
    expect(tableRows[2]).toHaveTextContent(/^Puhelinnumero000001111$/)
  })
})
