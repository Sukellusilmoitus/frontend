import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PageTitle from './PageTitle';

describe('page title tests', () => {
  it('renders the text as a heading', () => {
    render(<PageTitle text="test" />)
    const title = screen.getByRole('heading')
    expect(title).toHaveTextContent('test')
  })
})