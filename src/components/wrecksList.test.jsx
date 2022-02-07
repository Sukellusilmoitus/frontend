/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import WrecksList from './WrecksList';
import WreckService from '../services/wrecks';

const data = {
  features: [
    {
      properties: {
        name: 'first',
        id: 1,
      },
    },
    {
      properties: {
        name: 'second',
        id: 2,
      },
    },
  ],
};

test('renders component loading', () => {
  const component = render(
    <WrecksList />,
  );
  expect(component.container).toHaveTextContent(
    'Ladataan',
  );
});

test('service get called', async () => {
  WreckService.getAllWrecks = jest.fn().mockReturnValue(data);

  await act(async () => { render(<WrecksList />); });

  await expect(WreckService.getAllWrecks.mock.calls).toHaveLength(1);
});
