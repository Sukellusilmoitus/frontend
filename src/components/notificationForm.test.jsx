/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './NotificationForm';

test('form can be submitted with just name and email', () => {
  const createNotification = jest.fn();

  const component = render(
    <NoteForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');
  fireEvent.focus(form);

  const input = component.getByTestId('testname');
  const input2 = component.getByTestId('testemail');
  const input3 = component.getByTestId('testradio');
  const input4 = component.getByTestId('testradio2');
  expect(input3.checked).toEqual(false);
  expect(input4.checked).toEqual(false);

  fireEvent.change(input, {
    target: { value: 'Sukeltajan Nimi' },
  });
  fireEvent.change(input2, {
    target: { value: 'sukeltaja@test.com' },
  });

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(1);
  expect(createNotification.mock.calls[0][0].locationName).toBe('testihylky');
  expect(createNotification.mock.calls[0][0].locationId).toBe('456');
  expect(createNotification.mock.calls[0][0].name).toBe('Sukeltajan Nimi');
  expect(createNotification.mock.calls[0][0].email).toBe('sukeltaja@test.com');
});

test('renders component', () => {
  const component = render(
    <NoteForm />,
  );
  expect(component.container).toHaveTextContent(
    'Tee uusi sukellusilmoitus',
  );
});

test('<NoteForm /> updates parent state and calls onSubmit with all inputs filled', () => {
  const createNotification = jest.fn();

  const component = render(
    <NoteForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');
  fireEvent.focus(form);

  const input = component.getByTestId('testname');
  const input2 = component.getByTestId('testphone');

  const input3 = component.getByTestId('testradio');
  expect(input3.checked).toEqual(false);
  fireEvent.click(input3);
  expect(input3.checked).toEqual(true);
  const input4 = component.getByTestId('testxcoordinate');
  const input5 = component.getByTestId('testycoordinate');
  const input6 = component.getByTestId('testcoordinateinfo');

  const input7 = component.getByTestId('testradio2');
  expect(input7.checked).toEqual(false);
  fireEvent.click(input7);
  expect(input7.checked).toEqual(true);
  const input8 = component.getByTestId('testchange');

  const input9 = component.getByTestId('testmisc');

  fireEvent.change(input, {
    target: { value: 'Sukeltajan Nimi' },
  });
  fireEvent.change(input2, {
    target: { value: '0415064545' },
  });
  fireEvent.change(input4, {
    target: { value: '25.34234323' },
  });
  fireEvent.change(input5, {
    target: { value: '60.42342334' },
  });
  fireEvent.change(input6, {
    target: { value: 'koordinaatit selvitetty' },
  });
  fireEvent.change(input8, {
    target: { value: 'the front fell off' },
  });
  fireEvent.change(input9, {
    target: { value: 'a wave hit the ship' },
  });

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(1);
  expect(createNotification.mock.calls[0][0].locationName).toBe('testihylky');
  expect(createNotification.mock.calls[0][0].locationId).toBe('456');
  expect(createNotification.mock.calls[0][0].name).toBe('Sukeltajan Nimi');
  expect(createNotification.mock.calls[0][0].phone).toBe('0415064545');
  expect(createNotification.mock.calls[0][0].xCoordinate).toBe('25.34234323');
  expect(createNotification.mock.calls[0][0].yCoordinate).toBe('60.42342334');
  expect(createNotification.mock.calls[0][0].changeText).toBe('the front fell off');
  expect(createNotification.mock.calls[0][0].miscText).toBe('a wave hit the ship');
});
