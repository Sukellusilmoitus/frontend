import {
  Form,
  Button,
  Row,
  Col,
} from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  feedback: Yup.string().required('Palaute on pakollinen kenttä'),
  name: Yup.string().required('Nimi on pakollinen kenttä'),
  email: Yup.string().when('phone', {
    is: (phone) => !phone,
    then: Yup.string().email('Syötä kelvollinen sähköpostiosoite').required('Syötä sähköposti tai puhelinnumero'),
    otherwise: Yup.string().email('Syötä kelvollinen sähköpostiosoite'),
  }),
  phone: Yup.string().when('email', {
    is: (email) => !email,
    then: Yup.string().required('Syötä sähköposti tai puhelinnumero'),
    otherwise: Yup.string(),
  }),
}, [['phone', 'email']]);

function FeedbackForm({ onSubmit }) {
  const initialValues = {
    feedback: '',
    name: '',
    email: '',
    phone: '',
  };

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm({ values: '' });
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          className="mx-5 my-2"
          data-testid="feedback-form"
        >
          <Form.Group style={{ marginTop: '10px' }}>
            <Form.Label>Palaute sovelluksesta:</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="feedback"
              value={values.feedback}
              onChange={handleChange}
              isInvalid={touched.feedback && errors.feedback}
              data-testid="feedback-text"
              style={{ height: '250px' }}
              placeholder="Mikä sovelluksessa toimi hyvin? Mitä pitäisi parantaa?"
            />
            <Form.Control.Feedback type="invalid">
              { errors.feedback }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group style={{ marginTop: '10px' }}>
            <Form.Label>Nimi:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              isInvalid={touched.name && errors.name}
              data-testid="feedback-name"
            />
            <Form.Control.Feedback type="invalid">
              { errors.name }
            </Form.Control.Feedback>
          </Form.Group>
          <Row style={{ marginTop: '10px' }}>
            <Col>
              <Form.Group>
                <Form.Label>Sähköposti:</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={touched.email && errors.email}
                  data-testid="feedback-email"
                />
                <Form.Control.Feedback type="invalid">
                  { errors.email }
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Puhelinnumero:</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isInvalid={touched.phone && errors.phone}
                  data-testid="feedback-phone"
                />
                <Form.Control.Feedback type="invalid">
                  { errors.phone }
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" className="btn-success my-3">Lähetä</Button>
        </Form>
      )}
    </Formik>
  );
}

export default FeedbackForm;
