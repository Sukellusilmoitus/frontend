/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WrecksList from './WrecksList';
import wreckService from '../services/wrecks';

test('renders component loading', () => {
  const component = render(
    <WrecksList />,
  );
  expect(component.container).toHaveTextContent(
    'Ladataan',
  );
});

test('service get called', () => {
  wreckService.getAllWrecks = jest.fn().mockReturnValue();

  const component = render(
    <WrecksList />,
  );
  expect(wreckService.getAllWrecks.mock.calls).toHaveLength(1);
});
