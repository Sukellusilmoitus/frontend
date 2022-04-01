import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from './Login';
import { wait } from '@testing-library/user-event/dist/utils';


describe('Login page', () => {
  it('requires username to login', async () => {
    const component = render(<Login />);
    await waitFor(() => {
      fireEvent.change(component.getByTestId('password'), {
        taget: { value: 'password'}
      });
      fireEvent.click(component.getByTestId('kirjaudu'));
      expect(component.getByText('Väärä käyttäjätunnus tai salasana')).toBeInTheDocument();
    });
  });

  it('requires password to login', async () => {
    const component = render(<Login />);
    await waitFor(() => {
      fireEvent.change(component.getByTestId('username'), {
        taget: { value: 'username'}
      });
      fireEvent.click(component.getByTestId('kirjaudu'));
      expect(component.getByText('Väärä käyttäjätunnus tai salasana')).toBeInTheDocument();
    });
  });
});