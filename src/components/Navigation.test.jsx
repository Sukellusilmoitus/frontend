import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('navbar tests', () => {
  beforeEach(() => {
    render(<Navigation />, { wrapper: BrowserRouter })
  })

  it ('nav items have correct links', () => {
    const links = screen.getAllByRole('link')

    expect(links[0]).toHaveTextContent('Hylkysukellusilmoituspalvelu')
    expect(links[0].getAttribute('href')).toBe('/')

    expect(links[1]).toHaveTextContent('Etusivu')
    expect(links[1].getAttribute('href')).toBe('/etusivu')

    expect(links[2]).toHaveTextContent('Hylyt')
    expect(links[2].getAttribute('href')).toBe('/hylyt')
    
    expect(links[3]).toHaveTextContent('Uusi hylky')
    expect(links[3].getAttribute('href')).toBe('/uusi')
  })
});
