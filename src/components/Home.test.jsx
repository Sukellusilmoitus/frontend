import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home'

describe('home page tests', () => {
  it('home page component has correct child components', () => {
    render(<Home />)

    const mapComponent = screen.getByRole('presentation')
    expect(mapComponent).toBeDefined()

    const title = screen.getAllByRole('heading')[0]
    expect(title).toHaveTextContent('Hylyt kartalla')

    const infoText = screen.getByTestId('homepage-info')
    expect(infoText).toBeDefined()
    expect(infoText).toHaveTextContent('Tällä sivulla voit tehdä ilmoituksen sukelluksestasi ja kertoa havaintosi.')
  })
})