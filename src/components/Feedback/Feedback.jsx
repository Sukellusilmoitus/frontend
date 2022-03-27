import { Container } from 'react-bootstrap';
import FeedbackForm from './FeedbackForm';
import PageTitle from '../PageTitle';
import feedbackService from '../../services/feedbacks';

function Feedback() {
  const onSubmit = (feedback) => {
    const newFeedback = {
      feedback_text: feedback.feedback,
      feedback_giver_name: feedback.name,
      feedback_giver_email: feedback.email,
      feedback_giver_phone: feedback.phone,
    };
    feedbackService.create(newFeedback);
  };

  return (
    <Container fluid>
      <PageTitle text="Anna palautetta" />
      <FeedbackForm onSubmit={onSubmit} />
    </Container>
  );
}

export default Feedback;
