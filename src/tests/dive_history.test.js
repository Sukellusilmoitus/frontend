import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import DiveHistory from '../components/TargetPage/DiveHistory'

const mockDiveList = [
  {
    id: 1,
    created_at: '2020-02-02',
    change_text: 'Change',
    diver: {
      name: 'test diver'
    }
  }
]

describe('dive history list tests', () => {
  it('the component is rendered', () => {
    render(<DiveHistory diveList={mockDiveList} />)

    const firstDive = screen.getByTestId(1)

    expect(firstDive).toHaveTextContent('2020-02-02')
    expect(firstDive).toHaveTextContent('Sukeltaja')
    expect(firstDive).toHaveTextContent('test diver')
  })

  it('nothing is rendered with no dives', () => {
    render(<DiveHistory diveList={[]} />)

    const firstDive = screen.queryByTestId(1)

    expect(firstDive).toBeNull()
  })
})