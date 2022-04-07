import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import UserInfo from './UserInfo'
import * as service from '../../services/users';

const mockUser = {
  name: 'Do Doer',
  username: 'doer',
  password: 'verydifficultHash123',
  email: 'doer@test.com',
  phone: '000001111'
}

const mockUserNoEmail = {
  name: 'Do Doer',
  username: 'doer',
  password: 'verydifficultHash123',
  phone: '000001111'
}

describe('user info table tests', () => {
  it('correct information is rendered', () => {
    render(<UserInfo user={mockUser} />)

    const tableRows = screen.getAllByRole('row')
    expect(tableRows[0]).toHaveTextContent(/^Käyttäjänimidoer$/)
    expect(screen.getByTestId('email').value).toBe(mockUser.email);
    expect(screen.getByTestId('phone').value).toBe(mockUser.phone);
  });

  it('sends updated user data and saves auth', async () => {
    jest.spyOn(service, 'updateUser').mockImplementation(() => new Object({auth: 1234}));
    render(<UserInfo user={mockUser} />);
    await waitFor(() => {
      fireEvent.click(screen.getByTestId('save'));
    });
    expect(service.updateUser).toHaveBeenCalledTimes(1);
    const mockData = mockUser;
    delete mockData.password;
    expect(service.updateUser).toHaveBeenCalledWith(mockData);
    expect(localStorage.getItem('auth')).toBe('1234');
  });
});
