/* eslint-disable */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { wait } from '@testing-library/user-event/dist/utils';
import NewTargetForm from './NewTargetForm';
import { loggedUser } from '../services/users';

const postTarget = jest.fn();
let form; let input; let input1; let input2; let input3; let input4; let input5; let input6; let input7; let input8; let input9; let
  input10;

jest.mock('../services/users')

const mockUser = {
  name: 'Mock user',
  email: 'mock@email.jest',
  phone: '000-000-000'
}

describe('new target tests', () => {
  beforeEach(() => {
    loggedUser.mockReturnValue(null);
    const component = render(
      <NewTargetForm
        postTarget={postTarget}
      />,
    );
    form = component.getByTestId('testform');
    input1 = component.getByTestId('testtargetname');
    input = component.getByTestId('testdivername');
    input2 = component.getByTestId('testphone');
    input3 = component.getByTestId('testemail');
    input4 = component.getByTestId('testtargetdescription');
    input5 = component.getByTestId('testlocationname');
    input6 = component.getByTestId('testxcoordinate');
    input7 = component.getByTestId('testycoordinate');
    input8 = component.getByTestId('testcoordinateinfo');
    input9 = component.getByTestId('testdiverinfo');
    input10 = component.getByTestId('testmisctext');
  });

  test('renders component', () => {
    const title = screen.getAllByRole('heading')[0];
    expect(title).toHaveTextContent(
      'Tee ilmoitus uudesta kohteesta',
    );
  });

  test('typo form does not get submitted', async () => {
    fireEvent.change(input, {
      target: { value: 's' },
    });
    fireEvent.change(input1, {
      target: { value: 'h' },
    });
    fireEvent.change(input2, {
      target: { value: '0' },
    });
    fireEvent.change(input3, {
      target: { value: 's' },
    });
    fireEvent.change(input4, {
      target: { value: 'h' },
    });
    fireEvent.change(input5, {
      target: { value: 'n' },
    });
    fireEvent.change(input6, {
      target: { value: '2' },
    });
    fireEvent.change(input7, {
      target: { value: '6' },
    });
    fireEvent.change(input8, {
      target: { value: 'k' },
    });
    fireEvent.change(input9, {
      target: { value: 't' },
    });
    fireEvent.change(input10, {
      target: { value: 'a' },
    });

    await wait(() => {
      fireEvent.submit(form);
      expect(postTarget).toHaveBeenCalledTimes(1);
      expect(postTarget.mock.calls).toHaveLength(0);
      expect(component.container).toHaveTextContent(
        'Lomakkeesta puuttui tietoja tai siinä on virheitä!',
      );
    });
  });

  test('empty form does not get submitted', async () => {
    await wait(() => {
      fireEvent.submit(form);
      expect(postTarget).toHaveBeenCalledTimes(1);
      expect(postTarget.mock.calls).toHaveLength(0);
      expect(component.container).toHaveTextContent(
        'Lomakkeesta puuttui tietoja tai siinä on virheitä!',
      );
    });
  });

  test('submit works with all accurate inputs', async () => {
    fireEvent.change(input1, {
      target: { value: 'Hylyn Nimi' },
    });
    fireEvent.change(input, {
      target: { value: 'Sukeltajan Nimi' },
    });
    fireEvent.change(input2, {
      target: { value: '0415064545' },
    });
    fireEvent.change(input3, {
      target: { value: 'seppo@gmail.com' },
    });
    fireEvent.change(input4, {
      target: { value: 'hylky' },
    });
    fireEvent.change(input5, {
      target: { value: 'näsijärvi' },
    });
    fireEvent.change(input6, {
      target: { value: '25.34234323' },
    });
    fireEvent.change(input7, {
      target: { value: '60.42342334' },
    });
    fireEvent.change(input8, {
      target: { value: 'koordinaatit selvitetty' },
    });
    fireEvent.change(input9, {
      target: { value: 'the front fell off' },
    });
    fireEvent.change(input10, {
      target: { value: 'a wave hit the ship' },
    });

    await wait(() => {
      fireEvent.submit(form);
      expect(postTarget).toHaveBeenCalledTimes(1);

      expect(postTarget.mock.calls).toHaveLength(1);
      expect(postTarget.mock.calls[0][0].targetname).toBe('Hylyn Nimi');
      expect(postTarget.mock.calls[0][0].divername).toBe('Sukeltajan Nimi');
      expect(postTarget.mock.calls[0][0].phone).toBe('0415064545');
      expect(postTarget.mock.calls[0][0].email).toBe('seppo@gmail.com');
      expect(postTarget.mock.calls[0][0].type).toBe('hylky');
      expect(postTarget.mock.calls[0][0].town).toBe('näsijärvi');
      expect(postTarget.mock.calls[0][0].x_coordinate).toBe('25.34234323');
      expect(postTarget.mock.calls[0][0].y_coordinate).toBe('60.42342334');
      expect(postTarget.mock.calls[0][0].location_method).toBe('koordinaatit selvitetty');
      expect(postTarget.mock.calls[0][0].location_accuracy).toBe('the front fell off');
      expect(postTarget.mock.calls[0][0].miscText).toBe('a wave hit the ship');
      expect(component.container).toHaveTextContent(
        'Lomakkeesta puuttui tietoja tai siinä on virheitä!',
      );
    });
  });

  test('user logged renders', () => {

    loggedUser.mockReturnValue(mockUser);
  
    const component = render(
      <NewTargetForm
        postTarget={postTarget}
      />,
    );
    const username = component.getByTestId('testusername');
    expect(username.value).toEqual(mockUser.name)
  })
});
