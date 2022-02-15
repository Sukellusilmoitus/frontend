import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

test('renders loading', () => {
  const app = render(
    <Router>
      <App />
    </Router>
  )
  expect(app.container).toHaveTextContent('Hylkysukellusilmoituspalvelu');
})