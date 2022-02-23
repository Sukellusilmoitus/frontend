/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TargetsList from './TargetsList';

// const data = {
//   features: [
//     {
//       properties: {
//         name: 'first',
//         id: 1,
//       },
//     },
//     {
//       properties: {
//         name: 'second',
//         id: 2,
//       },
//     },
//   ],
// };

test('renders component loading', () => {
  const component = render(
    <TargetsList targets={[]} />,
  );
  expect(component.container).toHaveTextContent(
    'Ladataan',
  );
});
