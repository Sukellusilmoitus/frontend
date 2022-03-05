import { useState as useStateMock } from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SearchBar from './SearchBar';

const mockTargets = []

const mockSetTargets = jest.fn()

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

describe('search bar tests', () => {
  const setState = jest.fn()
  beforeEach(() => {
    useStateMock.mockImplementation(value => [value, setState])
    render(<SearchBar targets={mockTargets} setTargets={mockSetTargets} />)
  })

  it('typing in the search field updates the search state', () => {
    const input = screen.getByRole('textbox')
    fireEvent.change(input, {
      target: { value: 'aaa' }
    })
    expect(setState).toHaveBeenCalled()
  })

  it('selecting checkboxes changes the search state', () => {
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes.length).toEqual(4)
    checkboxes.forEach(box => box.click())
    expect(setState).toHaveBeenCalledTimes(4)
  })

  it('setter function is called on submit', () => {
    const button = screen.getByRole('button')
    button.click()
    expect(mockSetTargets).toHaveBeenCalled()
  })
})