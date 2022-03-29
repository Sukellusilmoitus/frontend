import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import User from './index'

describe('user page integration tests', () => {
  it('correct info shown during loading', () => {
    render(<User user={null} />)
    
    const page = screen.getByText('Ladataan')
    expect(page).toBeDefined()
  })

  it('correct info shown when no target was found', () => {
    render(<User user={undefined} />)
    
    const page = screen.getByText('Kyseistä suekltajaa ei löytynyt, onhan käyttämäsi osoite oikea?')
    expect(page).toBeDefined()
  })
})
