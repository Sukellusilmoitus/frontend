import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Navigation from './Navigation';

describe('navbar tests', () => { 
  it ('nav items have correct links', () => {
    render(<Navigation />, { wrapper: BrowserRouter })
    const links = screen.getAllByRole('link')

    expect(links[0]).toHaveTextContent('Hylkysukellusilmoituspalvelu')
    expect(links[0].getAttribute('href')).toBe('/')

    expect(links[1]).toHaveTextContent('Etusivu')
    expect(links[1].getAttribute('href')).toBe('/etusivu')

    expect(links[2]).toHaveTextContent('Hylyt')
    expect(links[2].getAttribute('href')).toBe('/hylyt')
    
    expect(links[3]).toHaveTextContent('Uusi hylky')
    expect(links[3].getAttribute('href')).toBe('/uusi')

    expect(links[4]).toHaveTextContent('Anna palautetta')
    expect(links[4].getAttribute('href')).toBe('/palaute')

    expect(links[5]).toHaveTextContent('Kirjaudu')
    expect(links[5].getAttribute('href')).toBe('/kirjaudu')
  })

  it('show kirjaudu ulos and oma sivu when auth token is present in local storage', () => {
    localStorage.setItem('auth', 'testdata');
    expect(localStorage.getItem('auth')).not.toBeNull;
    render(<Navigation />, { wrapper: BrowserRouter })
    const links = screen.getAllByRole('link')

    expect(links[5]).toHaveTextContent('Oma sivu')
    expect(links[5].getAttribute('href')).toBe('/omasivu')

    expect(links[6]).toHaveTextContent('Kirjaudu Ulos')
    expect(links[6].getAttribute('href')).toBe('/uloskirjautuminen')
  });
});
