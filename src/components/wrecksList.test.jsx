/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react-dom/test-utils';
import WrecksList from './WrecksList';
import wreckService from '../services/wrecks';

const data = [{}];

test('renders component loading', () => {
  const component = render(
    <WrecksList />,
  );
  expect(component.container).toHaveTextContent(
    'Ladataan',
  );
});

test('service get called', () => {
  wreckService.getAllWrecks = jest.fn().mockReturnValue(data);

  act(() => { (<WrecksList />); });

  expect(wreckService.getAllWrecks.mock.calls).toHaveLength(1);
});
