/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteForm from './notificationForm';

test('renders component', () => {
  const component = render(
    <NoteForm />,
  );
  expect(component.container).toHaveTextContent(
    'Tee uusi sukellusilmoitus',
  );
});

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNotification = jest.fn();

  const component = render(
    <NoteForm
      wreckName="testihylky"
      wreckId="456"
      createNotification={createNotification}
    />,
  );

  const input = component.getByTestId('testname');
  const input2 = component.getByTestId('testphone');
  const form = component.getByTestId('testform');

  fireEvent.change(input, {
    target: { value: 'Sukeltajan Nimi' },
  });
  fireEvent.change(input2, {
    target: { value: '0415064545' },
  });

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(1);
  expect(createNotification.mock.calls[0][0].name).toBe('Sukeltajan Nimi');
});
