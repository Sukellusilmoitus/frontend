/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WrecksList from './wrecksList';

test('renders component loading', () => {
  const component = render(
    <WrecksList />,
  );
  expect(component.container).toHaveTextContent(
    'Ladataan',
  );
});
