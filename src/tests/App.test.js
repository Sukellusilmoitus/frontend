import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import App from '../App';

test('renders loading', () => {
  const app = render(
    <App />
  )
  expect(app.container).toHaveTextContent('Hylkysukellusilmoituspalvelu');
})