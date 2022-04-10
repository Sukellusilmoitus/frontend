import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Modal from './Modal'

const mockCloseModal = jest.fn()

describe('modal component tests', () => {
  beforeEach(() => {
    render(
      <Modal modalOpen={true} closeModal={mockCloseModal}>
        <p>Lorem ipsum dolor sit amet</p>
      </Modal>
    )
  })

  it('modal renders its children', () => {
    const modal = screen.getByRole('dialog')
    expect(modal).toHaveTextContent('Lorem ipsum dolor sit amet')
  })
})
