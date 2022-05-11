import { fireEvent, render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

const mockSubmit = jest.fn()
const mockSetUsername = jest.fn()
const mockSetPassword = jest.fn()
const mockAlert = ''


describe('Login form tests', () => {
  beforeEach(() => {
    render(<LoginForm
        handleSubmit={mockSubmit}
        alert={mockAlert}
      />)
  })

  it('page has correct title', () => {
    const title = screen.getByRole('heading');
    expect(title).toHaveTextContent('Kirjaudu sisään')
  })
  
  it('requires username to login', async () => {
    const passwordField = screen.getByTestId('password')
    fireEvent.change(passwordField, {
      target: { value: 'username'}
    });
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockSubmit).not.toHaveBeenCalled()
  });

  it('requires password to login', async () => {
    const usernameField = screen.getByTestId('username')
    fireEvent.change(usernameField, {
      target: { value: 'username'}
    });
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockSubmit).not.toHaveBeenCalled()
  });

  it('calls the submit function with valid input', () => {
    const usernameField = screen.getByTestId('username')
    fireEvent.change(usernameField, {
      target: { value: 'username'}
    });
    const passwordField = screen.getByTestId('password')
    fireEvent.change(passwordField, {
      target: { value: 'username'}
    });
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockSubmit).toHaveBeenCalled()
  })
});
