import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Register from './Register';
import { wait } from '@testing-library/user-event/dist/utils';

describe('Register page', () => {
  let component, name, email, phone, username, password, submit, privacyCheck;
  beforeEach(() => {
    component = render(<Register />);
    name = component.getByTestId('name');
    email = component.getByTestId('email');
    phone = component.getByTestId('phone');
    username = component.getByTestId('username');
    password = component.getByTestId('password');
    submit = component.getByTestId('submit');
    privacyCheck = component.getByRole('checkbox')
  });

  it('page has correct title', () => {
    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('Rekisteröidy')
  })

  it('requires name', () => {
    fireEvent.click(privacyCheck);
    fireEvent.click(submit);
    expect(component.getByText('Lisää puuttuvat tiedot')).toBeInTheDocument();
  });

  it('requires email or phone', async () => {
    await wait(() => {
      fireEvent.change(name, {
        target: { value: 'name'}
      });
      fireEvent.change(username, {
        target: { value: 'username'}
      });
      fireEvent.change(password, {
        target: { value: 'password'}
      });
      fireEvent.click(submit);
      expect(component.getByText('Syötä sähköposti tai puhelinnumero')).toBeInTheDocument();
    });
  });

  it('notificies when username is already in use', async () => {
    await wait(() => {
      fireEvent.change(name, {
        target: { value: 'name'}
      });
      fireEvent.change(email, {
        target: { value: 'test@test.com'}
      });
      fireEvent.change(username, {
        target: { value: 'username'}
      });
      fireEvent.change(password, {
        target: { value: 'password'}
      });
      fireEvent.click(submit);
      expect(component.getByText('Käyttäjätunnus on jo käytössä')).toBeInTheDocument();
    });
  });

  it('privacy terms are opened when clicking the link', () => {
    const header = screen.getAllByRole('heading')
    expect(header).toHaveLength(1)
    expect(header[0]).toHaveTextContent('Rekisteröidy')
    const privacyLink = screen.getByText('tietosuojaehdot')
    fireEvent.click(privacyLink)
    const headers = screen.getAllByRole('heading')
    expect(headers).toHaveLength(2)
    expect(headers[1]).toHaveTextContent('Tietosuoja')
  })

  it('privacy terms close from close button', () => {
    const privacyLink = screen.getByText('tietosuojaehdot')
    fireEvent.click(privacyLink)
    const headers = screen.getAllByRole('heading')
    expect(headers[1]).toHaveTextContent('Tietosuoja')
    const closeButton = screen.getByText('Sulje')
    fireEvent.click(closeButton)
    const header = screen.getAllByRole('heading')
    expect(header).toHaveLength(1)
    expect(header[0]).toHaveTextContent('Rekisteröidy')
  })

  it('terms have to be accepted to submit the form', () => {
    expect(submit).toBeDisabled()
    fireEvent.click(privacyCheck);
    expect(submit).not.toBeDisabled()
  })
});