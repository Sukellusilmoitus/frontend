import { Container, Alert } from 'react-bootstrap';
import { useState } from 'react';
import Helmet from 'react-helmet';
import FeedbackForm from './FeedbackForm';
import PageTitle from '../PageTitle';
import feedbackService from '../../services/feedbacks';

function Feedback() {
  const [message, setMessage] = useState('');
  const onSubmit = (feedback) => {
    const newFeedback = {
      feedback_text: feedback.feedback,
      feedback_giver_name: feedback.name,
      feedback_giver_email: feedback.email,
      feedback_giver_phone: feedback.phone,
    };
    try {
      feedbackService.create(newFeedback);
      setMessage('Palaute lähetetty');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (err) {
      setMessage('Jotain meni pieleen');
    }
  };

  return (
    <Container fluid>
      <Helmet>
        <title>Anna palautetta</title>
      </Helmet>
      <PageTitle text="Anna palautetta" />
      {message && <Alert variant="success">{message}</Alert>}
      <FeedbackForm onSubmit={onSubmit} />
    </Container>
  );
}

export default Feedback;
