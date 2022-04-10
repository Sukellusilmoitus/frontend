import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { wait } from '@testing-library/user-event/dist/utils';


describe('Login page', () => {
  it('page has correct title', () => {
    render(<Login />);
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent('Kirjaudu sisään')
  })
  
  it('requires username to login', async () => {
    const component = render(<Login />);
    fireEvent.change(component.getByTestId('password'), {
      taget: { value: 'password'}
    });
    fireEvent.click(component.getByTestId('kirjaudu'));
    await waitFor(() => {
      expect(component.getByText('Väärä käyttäjätunnus tai salasana')).toBeInTheDocument();
    });
  });

  it('requires password to login', async () => {
    const component = render(<Login />);
    fireEvent.change(component.getByTestId('username'), {
      taget: { value: 'username'}
    });
    fireEvent.click(component.getByTestId('kirjaudu'));
    await waitFor(() => {
      expect(component.getByText('Väärä käyttäjätunnus tai salasana')).toBeInTheDocument();
    });
  });
});