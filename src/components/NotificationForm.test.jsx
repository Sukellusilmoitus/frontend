/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NewNotificationForm from './NotificationForm';

window.alert = jest.fn();

test('renders component', () => {
  const component = render(
    <NewNotificationForm />,
  );
  expect(component.container).toHaveTextContent(
    'Tee uusi sukellusilmoitus',
  );
});

test('no change accurate coordinates required filled gets submitted', () => {
  const createNotification = jest.fn();
  const component = render(
    <NewNotificationForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');

  const input = component.getByTestId('testdivername');
  const input2 = component.getByTestId('testphone');

  fireEvent.change(input, {
    target: { value: 'Seppo Myrskyranta' },
  });
  fireEvent.change(input2, {
    target: { value: '0455705656' },
  });

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(1);
  expect(component.container).toHaveTextContent(
    'Lomake lähetetty!',
  );
});

test('phone or email required', () => {
  const createNotification = jest.fn();
  const component = render(
    <NewNotificationForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');

  const input = component.getByTestId('testdivername');

  fireEvent.change(input, {
    target: { value: 'Seppo Myrskyranta' },
  });

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(0);
  expect(component.container).toHaveTextContent(
    'Ilmoita puhelinnumero tai sähköpostiosoite!',
  );
});

test('typo form does not get submitted', () => {
  const createNotification = jest.fn();
  const component = render(
    <NewNotificationForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');

  const input = component.getByTestId('testdivername');
  const input2 = component.getByTestId('testphone');
  const input3 = component.getByTestId('testemail');
  const input4 = component.getByTestId('testradio2');

  expect(input4.checked).toEqual(false);
  fireEvent.click(input4);
  expect(input4.checked).toEqual(true);
  const input5 = component.getByTestId('testxcoordinate');
  const input6 = component.getByTestId('testycoordinate');

  const input7 = component.getByTestId('testcoordinateinfo');
  const input8 = component.getByTestId('testradio3');
  expect(input8.checked).toEqual(false);
  fireEvent.click(input8);
  expect(input8.checked).toEqual(true);
  const input9 = component.getByTestId('testchange');
  const input10 = component.getByTestId('testmisc');

  fireEvent.change(input, {
    target: { value: 'S' },
  });
  fireEvent.change(input2, {
    target: { value: '0' },
  });
  fireEvent.change(input3, {
    target: { value: 't' },
  });
  fireEvent.change(input5, {
    target: { value: 'koira' },
  });
  fireEvent.change(input6, {
    target: { value: 'kissa' },
  });
  fireEvent.change(input7, {
    target: { value: 'g' },
  });
  fireEvent.change(input9, {
    target: { value: 'm' },
  });
  fireEvent.change(input10, {
    target: { value: 'ä' },
  });

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(0);
  expect(component.container).toHaveTextContent(
    'Lomakkeesta puuttui tietoja tai siinä on virheitä!',
  );
});

test('all inputs filled gets submitted', () => {
  const createNotification = jest.fn();
  const component = render(
    <NewNotificationForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');

  const input = component.getByTestId('testdivername');
  const input2 = component.getByTestId('testphone');
  const input3 = component.getByTestId('testemail');
  const input4 = component.getByTestId('testradio2');

  expect(input4.checked).toEqual(false);
  fireEvent.click(input4);
  expect(input4.checked).toEqual(true);
  const input5 = component.getByTestId('testxcoordinate');
  const input6 = component.getByTestId('testycoordinate');

  const input7 = component.getByTestId('testcoordinateinfo');
  const input8 = component.getByTestId('testradio3');
  expect(input8.checked).toEqual(false);
  fireEvent.click(input8);
  expect(input8.checked).toEqual(true);
  const input9 = component.getByTestId('testchange');
  const input10 = component.getByTestId('testmisc');

  fireEvent.change(input, {
    target: { value: 'Seppo Myrskyranta' },
  });
  fireEvent.change(input2, {
    target: { value: '0455705656' },
  });
  fireEvent.change(input3, {
    target: { value: 'testi@testi.fi' },
  });
  fireEvent.change(input5, {
    target: { value: '45' },
  });
  fireEvent.change(input6, {
    target: { value: '45' },
  });
  fireEvent.change(input7, {
    target: { value: 'gps paikannus' },
  });
  fireEvent.change(input9, {
    target: { value: 'muutos havaittu' },
  });
  fireEvent.change(input10, {
    target: { value: 'testitekstiä' },
  });

  fireEvent.submit(form);
  expect(createNotification.mock.calls).toHaveLength(1);
  expect(component.container).toHaveTextContent(
    'Lomake lähetetty!',
  );
});

test('type change and change mind gets submitted', () => {
  const createNotification = jest.fn();
  const component = render(
    <NewNotificationForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');

  const input = component.getByTestId('testdivername');
  const input2 = component.getByTestId('testphone');
  const input3 = component.getByTestId('testradio3');

  expect(input3.checked).toEqual(false);
  fireEvent.click(input3);
  expect(input3.checked).toEqual(true);

  const input4 = component.getByTestId('testchange');

  fireEvent.change(input4, {
    target: { value: 'kissa' },
  });

  const input5 = component.getByTestId('testradio4');
  fireEvent.click(input5);
  expect(input3.checked).toEqual(false);

  fireEvent.change(input, {
    target: { value: 'Seppo Myrskyranta' },
  });
  fireEvent.change(input2, {
    target: { value: '0455705656' },
  });

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(1);
  expect(component.container).toHaveTextContent(
    'Lomake lähetetty!',
  );
});

test('empty form does not get submitted', () => {
  const createNotification = jest.fn();
  const component = render(
    <NewNotificationForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );
  const form = component.getByTestId('testform');

  fireEvent.submit(form);

  expect(createNotification.mock.calls).toHaveLength(0);
  expect(component.container).toHaveTextContent(
    'Ilmoita sukeltajan nimi!',
  );
});

test('checking coordinates were wrong and then checking they were correct again allows to submit the form without entering new coordinates', () => {
  const createNotification = jest.fn();
  const component = render(
    <NewNotificationForm
      targetName="testihylky"
      targetId="456"
      createNotification={createNotification}
    />,
  );

  const input = component.getByTestId('testdivername');
  const input2 = component.getByTestId('testphone');

  fireEvent.change(input, {
    target: { value: 'Seppo Myrskyranta' },
  });
  fireEvent.change(input2, {
    target: { value: '0455705656' },
  });

  const coordinatesCorrectRadio = component.getByTestId('testradio1')
  const coordinatesIncorrectRadio = component.getByTestId('testradio2')
  const form = component.getByTestId('testform')

  fireEvent.click(coordinatesIncorrectRadio)
  fireEvent.submit(form)

  expect(createNotification).toHaveBeenCalledTimes(0)

  fireEvent.click(coordinatesCorrectRadio)
  fireEvent.submit(form)

  expect(createNotification).toHaveBeenCalledTimes(1)
})
