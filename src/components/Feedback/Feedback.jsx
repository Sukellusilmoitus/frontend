import { Container, Row } from 'react-bootstrap';
import FeedbackForm from './FeedbackForm';
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
    <Container fluid style={{ width: '100%' }}>
      <Row className="bg-light p-1 text-muted" style={{ borderRadius: '10px' }}>
        <p className="m-1" style={{ fontSize: 18 }}>Anna palautetta</p>
      </Row>
      <Row className="mx-5 justify-content-center" style={{ textAlign: 'center' }}>
        <FeedbackForm onSubmit={onSubmit} />
      </Row>
    </Container>
  );
}

export default Feedback;
