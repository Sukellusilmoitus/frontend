import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { loginRequest, loggedUser } from '../services/users';

function Login({ setUser }) {
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
        const user = loggedUser();
        setUser(user);
        history.push('/');
      } else {
        addAlert('Väärä käyttäjätunnus tai salasana');
      }
    } catch (e) {
      addAlert('Väärä käyttäjätunnus tai salasana');
    }
  };

  return (
    <>
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Käyttäjätunnus:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Salasana:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">Kirjaudu</Button>
      </Form>
      <a href="/rekisteroidy">Rekisteröidy</a>
    </>
  );
}

export default Login;
