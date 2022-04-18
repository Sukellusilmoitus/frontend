import React, { useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import {
  Alert, Button, Container, Form,
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { loginRequest } from '../services/users';
import PageTitle from './PageTitle';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      history.push('/');
    }
  }, []);

  const addAlert = (text) => {
    setAlert(text);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await loginRequest(username, password);
      if (res.auth) {
        localStorage.setItem('auth', res.auth);
        history.push('/');
      } else {
        addAlert('Väärä käyttäjätunnus tai salasana');
      }
    } catch (e) {
      addAlert('Väärä käyttäjätunnus tai salasana');
    }
  };

  return (
    <Container>
      <Helmet>
        <title>Kirjaudu sisään</title>
      </Helmet>
      <PageTitle text="Kirjaudu sisään" />
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Form onSubmit={handleSubmit}>
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

export default Login;
