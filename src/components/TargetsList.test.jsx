/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import TargetsList from './TargetsList'
import targetService from '../services/targets';

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
    <TargetsList />,
  );
  expect(component.container).toHaveTextContent(
    'Ladataan',
  );
});

test('service get called', async () => {
  targetService.getAllTargets = jest.fn().mockReturnValue(data);

  await act(async () => { render(<TargetsList />); });

  await expect(targetService.getAllTargets.mock.calls).toHaveLength(1);
});
