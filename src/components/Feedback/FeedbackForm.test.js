import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FeedbackForm from './FeedbackForm'
import { loggedUser } from '../../services/users';

const mockSubmit = jest.fn()

jest.mock('../../services/users')

const mockUser = {
  name: 'Mock user',
  email: 'mock@email.jest',
  phone: '000-000-000'
}

describe('feedback form tests', () => {
  beforeEach(() => {
    loggedUser.mockReturnValue(null);
    render(<FeedbackForm onSubmit={mockSubmit} />)
  })

  it('the form has the correct fields', () => {
    const inputFields = screen.getAllByRole('textbox')
    expect(inputFields).toHaveLength(4)

    const submit = screen.getByTestId('submit-button')
    expect(submit).toBeDefined()

    const feedbackText = screen.getByTestId('feedback-text')
    expect(feedbackText).toBeDefined()

    const feedbackName = screen.getByTestId('feedback-name')
    expect(feedbackName).toBeDefined()

    const feedbackEmail = screen.getByTestId('feedback-email')
    expect(feedbackEmail).toBeDefined()

    const feedbackPhone = screen.getByTestId('feedback-phone')
    expect(feedbackPhone).toBeDefined()

    const privacyToggle = screen.getByTestId('privacyToggle')
    expect(privacyToggle).toBeDefined()
  })

  it('the fields have correct initial values', () => {
    const feedbackText = screen.getByTestId('feedback-text')
    expect(feedbackText.value).toEqual('')

    const feedbackName = screen.getByTestId('feedback-name')
    expect(feedbackName.value).toEqual('')

    const feedbackEmail = screen.getByTestId('feedback-email')
    expect(feedbackEmail.value).toEqual('')

    const feedbackPhone = screen.getByTestId('feedback-phone')
    expect(feedbackPhone.value).toEqual('')
  })

  it('typing in fields changes their value', async () => {
    const feedbackText = screen.getByTestId('feedback-text')
    const feedbackName = screen.getByTestId('feedback-name')
    const feedbackEmail = screen.getByTestId('feedback-email')
    const feedbackPhone = screen.getByTestId('feedback-phone')

    await waitFor(() => {
      fireEvent.change(feedbackText, {
        target: { value: 'test feedback' }
      })
    })
    expect(feedbackText.value).toEqual('test feedback')

    await waitFor(() => {
      fireEvent.change(feedbackName, {
        target: { value: 'tester' }
      })
    })
    expect(feedbackName.value).toEqual('tester')

    await waitFor(() => {
      fireEvent.change(feedbackEmail, {
        target: { value: 'tester@email.com' }
      })
    })
    expect(feedbackEmail.value).toEqual('tester@email.com')

    await waitFor(() => {
      fireEvent.change(feedbackPhone, {
        target: { value: '1234567' }
      })
    })
    expect(feedbackPhone.value).toEqual('1234567')
  })

  it('phone not required when email is entered', async () => {
    const submit = screen.getByTestId('submit-button')
    const feedbackEmail = screen.getByTestId('feedback-email')
    const feedbackPhone = screen.getByTestId('feedback-phone')

    // activates formik validity check
    await waitFor(() => {
      fireEvent.click(submit)
    })

    expect(feedbackPhone).toHaveClass('is-invalid')

    await waitFor(() => {
      fireEvent.change(feedbackEmail, {
        target: { value: 'tester@email.com' }
      })
    })

    expect(feedbackPhone).not.toHaveClass('is-invalid')
  })

  it('email not required when phone is entered', async () => {
    const submit = screen.getByTestId('submit-button')
    const feedbackEmail = screen.getByTestId('feedback-email')
    const feedbackPhone = screen.getByTestId('feedback-phone')

    await waitFor(() => {
      fireEvent.click(submit)
    })

    expect(feedbackEmail).toHaveClass('is-invalid')

    await waitFor(() => {
      fireEvent.change(feedbackPhone, {
        target: { value: '1234567' }
      })
    })

    expect(feedbackEmail).not.toHaveClass('is-invalid')
  })

  it('email does not pass validation with invalid email address', async () => {
    const submit = screen.getByTestId('submit-button')
    const feedbackEmail = screen.getByTestId('feedback-email')

    await waitFor(() => {
      fireEvent.click(submit)
    })

    expect(feedbackEmail).toHaveClass('is-invalid')

    await waitFor(() => {
      fireEvent.change(feedbackEmail, {
        target: { value: 'tester' }
      })
    })

    expect(feedbackEmail).toHaveClass('is-invalid')

    await waitFor(() => {
      fireEvent.click(submit)
    })
  })

  it('submit function is called with valid inputs', async () => {
    const submit = screen.getByTestId('submit-button')
    const feedbackText = screen.getByTestId('feedback-text')
    const feedbackName = screen.getByTestId('feedback-name')
    const feedbackEmail = screen.getByTestId('feedback-email')
    const feedbackPhone = screen.getByTestId('feedback-phone')
    const privacyToggle = screen.getByTestId('privacyToggle')

    await waitFor(() => {
      fireEvent.change(feedbackText, {
        target: { value: 'test feedback' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackName, {
        target: { value: 'tester' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackEmail, {
        target: { value: 'tester@email.com' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackPhone, {
        target: { value: '1234567' }
      })
    })

    await waitFor(() => {
      fireEvent.click(privacyToggle)
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })

    expect(mockSubmit).toHaveBeenCalledTimes(1)
  })

  it('submit function is not called with missing inputs', async () => {
    const submit = screen.getByTestId('submit-button')
    const feedbackText = screen.getByTestId('feedback-text')

    await waitFor(() => {
      fireEvent.change(feedbackText, {
        target: { value: 'test feedback' }
      })
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })

    expect(mockSubmit).not.toHaveBeenCalled()
  })

  it('submit function is not called with invalid email', async () => {
    const submit = screen.getByTestId('submit-button')
    const feedbackText = screen.getByTestId('feedback-text')
    const feedbackName = screen.getByTestId('feedback-name')
    const feedbackEmail = screen.getByTestId('feedback-email')
    const feedbackPhone = screen.getByTestId('feedback-phone')

    await waitFor(() => {
      fireEvent.change(feedbackText, {
        target: { value: 'test feedback' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackName, {
        target: { value: 'tester' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackEmail, {
        target: { value: 'tester' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackPhone, {
        target: { value: '1234567' }
      })
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })

    expect(mockSubmit).not.toHaveBeenCalled()
  })


  it('submit function is not called if privacy terms not accepted', async () => {
    const submit = screen.getByTestId('submit-button')
    const feedbackText = screen.getByTestId('feedback-text')
    const feedbackName = screen.getByTestId('feedback-name')
    const feedbackEmail = screen.getByTestId('feedback-email')
    const feedbackPhone = screen.getByTestId('feedback-phone')

    await waitFor(() => {
      fireEvent.change(feedbackText, {
        target: { value: 'test feedback' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackName, {
        target: { value: 'tester' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackEmail, {
        target: { value: 'tester@email.com' }
      })
    })
    await waitFor(() => {
      fireEvent.change(feedbackPhone, {
        target: { value: '1234567' }
      })
    })

    await waitFor(() => {
      fireEvent.click(submit)
    })

    expect(mockSubmit).not.toHaveBeenCalled()
  })
})


describe('feedback logged form tests', () => {

  it('logged user renders', () => {

    loggedUser.mockReturnValue(mockUser);
    const component = render(
    <FeedbackForm onSubmit={mockSubmit} />)
    const feedbackName = component.getByTestId('feedback-name')
    expect(feedbackName.value).toEqual(mockUser.name)
  })