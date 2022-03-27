import { Form } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  feedback: Yup.string().required('Palaute on pakollinen'),
  name: Yup.string().required('Nimi on pakollinen'),
  email: Yup.string().email('Anna kelvollinen sähköpostiosoite').required('Sähköposti on pakollinen'),
  phone: Yup.string().required(),
});

function FeedbackForm() {
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
      onSubmit={console.log}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Palaute</Form.Label>
            <Form.Control
              as="textarea"
              type="text"
              name="feedback"
              value={values.feedback}
              onchange={handleChange}
              isValid={touched.feedback && errors.feedback}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nimi</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={values.name}
              onchange={handleChange}
              isValid={touched.name && errors.name}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Sähköposti</Form.Label>
            <Form.Control
              type="text"
              name="email"
              value={values.email}
              onchange={handleChange}
              isValid={touched.email && errors.email}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Puhelinnumero</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={values.phone}
              onchange={handleChange}
              isValid={touched.phone && errors.phone}
            />
          </Form.Group>
        </Form>
      )}
    </Formik>
  );
}

export default FeedbackForm;
