import { useState } from 'react';
import {
  Alert, Button, Container, Form,
} from 'react-bootstrap';
import PageTitle from '../PageTitle';

function LoginForm({ handleSubmit, alert }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    if (!!username && !!password) {
      handleSubmit(username, password);
    }
  };

  return (
    <Container>
      <PageTitle text="Kirjaudu sisään" />
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            data-testid="username"
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Salasana:</Form.Label>
          <Form.Control
            data-testid="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
        </Form.Group>
        <Button
          data-testid="kirjaudu"
          variant="primary"
          type="submit"
        >
          Kirjaudu
        </Button>
      </Form>
      <a href="/rekisteroidy">Rekisteröidy</a>
    </Container>
  );
}

export default LoginForm;
