import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Feedback from './Feedback'

describe('feedback page tests', () => {
  it('feedback page renders with correct title', () => {
    render(<Feedback />)
    const heading = screen.getByRole('heading')
    expect(heading).toHaveTextContent('Anna palautetta')
  })
})