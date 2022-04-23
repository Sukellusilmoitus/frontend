import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Target from './index'

window.scrollTo = jest.fn()

describe('target page integration tests', () => {
  it('correct info shown during loading', () => {
    render(<Target target={null} />)
    const page = screen.getByText('Ladataan')
    expect(page).toBeDefined()
  })

  it('correct info shown when no target was found', () => {
    render(<Target target={undefined} />)
    const page = screen.getByText('Kyseisellä id:llä ei löytynyt yhtään kohdetta, onhan käyttämäsi osoite oikea?')
    expect(page).toBeDefined()
  })
})
