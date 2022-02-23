/* eslint-disable no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { wait } from '@testing-library/user-event/dist/utils';
import NewTargetForm from './NewTargetForm';

window.alert = jest.fn();

test('renders component', () => {
  const component = render(
    <NewTargetForm />,
  );
  expect(component.container).toHaveTextContent(
    'Tee ilmoitus uudesta kohteesta',
  );
});

test('typo form does not get submitted', () => {
  window.alert.mockClear();
  const postTarget = jest.fn();
  const component = render(
    <NewTargetForm
      postTarget={postTarget}
    />,
  );
  const form = component.getByTestId('testform');

  const input = component.getByTestId('testdivername');
  const input2 = component.getByTestId('testphone');
  const input3 = component.getByTestId('testemail');

  const input4 = component.getByTestId('testtargetdescription');
  const input5 = component.getByTestId('testlocationname');

  const input6 = component.getByTestId('testxcoordinate');
  const input7 = component.getByTestId('testycoordinate');
  const input8 = component.getByTestId('testcoordinateinfo');

  const input9 = component.getByTestId('testdiverinfo');

  const input10 = component.getByTestId('testmisctext');

  fireEvent.change(input, {
    target: { value: 's' },
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

  fireEvent.submit(form);

  expect(postTarget.mock.calls).toHaveLength(0);
  expect(component.container).toHaveTextContent(
    'Lomakkeesta puuttui tietoja tai siinä on virheitä!',
  );
});

test('empty form does not get submitted', () => {
  window.alert.mockClear();
  const postTarget = jest.fn();
  const component = render(
    <NewTargetForm
      postTarget={postTarget}
    />,
  );
  const form = component.getByTestId('testform');

  fireEvent.submit(form);

  expect(postTarget.mock.calls).toHaveLength(0);
  expect(component.container).toHaveTextContent(
    'Ilmoita puhelinnumero tai sähköpostiosoite!',
  );
});

test('submit works with all accurate inputs', async () => {
  const postTarget = jest.fn();
  const component = render(
    <NewTargetForm
      postTarget={postTarget}
    />,
  );
  const form = component.getByTestId('testform');

  const input = component.getByTestId('testdivername');
  const input2 = component.getByTestId('testphone');
  const input3 = component.getByTestId('testemail');

  const input4 = component.getByTestId('testtargetdescription');
  const input5 = component.getByTestId('testlocationname');

  const input6 = component.getByTestId('testxcoordinate');
  const input7 = component.getByTestId('testycoordinate');
  const input8 = component.getByTestId('testcoordinateinfo');

  const input9 = component.getByTestId('testdiverinfo');

  const input10 = component.getByTestId('testmisctext');

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
    // console.log(postTarget.mock.calls);
    expect(postTarget.mock.calls).toHaveLength(1);
    expect(postTarget.mock.calls[0][0].name).toBe('Sukeltajan Nimi');
    expect(postTarget.mock.calls[0][0].phone).toBe('0415064545');
    expect(postTarget.mock.calls[0][0].email).toBe('seppo@gmail.com');
    expect(postTarget.mock.calls[0][0].type).toBe('hylky');
    expect(postTarget.mock.calls[0][0].town).toBe('näsijärvi');
    expect(postTarget.mock.calls[0][0].x_coordinate).toBe('25.34234323');
    expect(postTarget.mock.calls[0][0].y_coordinate).toBe('60.42342334');
    expect(postTarget.mock.calls[0][0].location_method).toBe('koordinaatit selvitetty');
    expect(postTarget.mock.calls[0][0].location_accuracy).toBe('the front fell off');
    expect(postTarget.mock.calls[0][0].miscText).toBe('a wave hit the ship');
    expect(component.container).toHaveTextContent('Lomake lähetetty!');
  });
});
