import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DiveHistory from './DiveHistory';
import dayjs from 'dayjs';

const diveList = [
  {
    id: 0,
    created_at: new Date(),
    diver: {
      name: 'name',
    }
  },
  {
    id: 1,
    created_at: new Date(),
    diver: {
      name: 'name2',
    },
    change_text: 'paljon muutoksia'
  },
];

test('renders dives', () => {
  const component = render(
    <DiveHistory diveList={diveList} />,
  );
  expect(component.container).toHaveTextContent(
    'Sukellushistoria'
  );

  expect(component.getByTestId('0')).toHaveTextContent(
    `${dayjs(new Date()).format('DD.MM.YYYY')}Sukeltaja: nameMuutokset: ei muutoksia`
  );
  expect(component.getByTestId('1')).toHaveTextContent(
    `${dayjs(new Date()).format('DD.MM.YYYY')}Sukeltaja: name2Muutokset: paljon muutoksia`
  );
});

test('do not try to render if no diving history', () => {
  const component = render(
    <DiveHistory diveList={[]} />,
  );
  expect(component.container).toHaveTextContent(
    'Ei rekisteröityjä sukelluksia'
  );
});