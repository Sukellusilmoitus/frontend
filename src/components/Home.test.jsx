import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Home from './Home'

describe('home page tests', () => {
  it('home page component has correct child components', () => {
    render(<Home />)

    const mapComponent = screen.getByRole('presentation')
    expect(mapComponent).toBeDefined()

    const infoText = screen.getByTestId('homepage-info')
    expect(infoText).toBeDefined()
  })
})