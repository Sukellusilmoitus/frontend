import React, { useState } from 'react';
import {
  Alert,
  Button,
  Container, Table,
} from 'react-bootstrap';
import { updateUser } from '../../services/users';

function UserInfo({ user }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [alert, setAlert] = useState(null);
  const [alertVariant, setAlertVariant] = useState('danger');

  const addAlert = (text, success) => {
    setAlertVariant(success ? 'success' : 'danger');
    setAlert(text);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const saveChanges = async () => {
    if (name.length < 1) {
      addAlert('Nimi liian lyhyt');
      return;
    }
    if (phone.length === 0 && email.length === 0) {
      addAlert('Puhelinnumero tai sähköposti annettava');
      return;
    }
    if ((phone.length === 0 && email.length < 5) || email.length > 25) {
      addAlert('Virheellinen sähköposti');
      return;
    }
    if ((email.length === 0 && phone.length < 5) || phone.length > 20) {
      addAlert('Virheellinen puhelinnumero');
      return;
    }
    const updatedUser = {
      name,
      username: user.username,
      email,
      phone,
    };
    try {
      const res = await updateUser(updatedUser);
      if (res.auth) {
        localStorage.setItem('auth', res.auth);
        addAlert('Tiedot tallennettu onnistuneesti', true);
        return;
      }
      addAlert('Tapahtui virhe');
    } catch (e) {
      addAlert('Tapahtui virhe');
    }
  };

  return (
    <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
      {alert && <Alert variant={alertVariant}>{alert}</Alert>}
      <Table data-testid="testinfotable" bordered size="sm">
        <tbody>
          <tr>
            <td>Nimi</td>
            <td>
              <input
                style={{ width: '100%' }}
                type="text"
                data-testid="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Sähköposti</td>
            <td>
              <input
                style={{ width: '100%' }}
                type="text"
                data-testid="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>Puhelinnumero</td>
            <td>
              <input
                style={{ width: '100%' }}
                type="text"
                data-testid="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </td>
          </tr>
        </tbody>
      </Table>
      <Button data-testid="save" onClick={() => saveChanges()}>Tallenna muutokset</Button>
    </Container>
  );
}

export default UserInfo;
