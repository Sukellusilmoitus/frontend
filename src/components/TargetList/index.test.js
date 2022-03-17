import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TargetList from './index'

describe('target list integration tests', () => {
  it('correct content rendered during loading', () => {
    render(<TargetList targets={'loading...'} />)

    const loading = screen.getByTestId('loading-spinner')
    expect(loading).toBeDefined()
  })

  it('search form is rendered', () => {
    render(<TargetList targets={[]} />)

    const searchForm = screen.getByTestId('search-form')
    expect(searchForm).toBeDefined()
  })
})