import React, { useEffect, useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { registerRequest } from '../services/users';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
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
    if (name === '' || username === '' || password === '') {
      addAlert('Lisää puuttuvat tiedot')
    }
    else if (email === '' && phone === '') {
      addAlert('Syötä sähköposti tai puhelinnumero');
      return;
    }
    try {
      const res = await registerRequest(username, password, name, email, phone);
      if (res) {
        history.push('/login');
      } else {
        addAlert('Käyttäjätunnus on jo käytössä');
      }
    } catch (e) {
      addAlert('Käyttäjätunnut on jo käytössä');
    }
  };

  return (
    <>
      {alert && <Alert variant="danger">{alert}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Etu- ja sukunimi:</Form.Label>
          <Form.Control
            type="text"
            name="name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            Pakollinen kenttä
          </Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Puhelinnumero:</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            onChange={(e) => setPhone(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Sähköposti:</Form.Label>
          <Form.Control
            type="text"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
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
        <Button variant="primary" type="submit">Rekisteröidy</Button>
      </Form>
    </>
  );
}

export default Register;
