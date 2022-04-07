import React, { useState } from 'react';
import {
  Button,
  Container, Table,
} from 'react-bootstrap';
import { updateUser } from '../../services/users';

function UserInfo({ user }) {
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);

  const saveChanges = async () => {
    const updatedUser = {
      name: user.name,
      username: user.username,
      email,
      phone,
    };
    const res = await updateUser(updatedUser);
    if (res.auth) {
      localStorage.setItem('auth', res.auth);
    }
  };

  return (
    <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Table data-testid="testinfotable" bordered size="sm">
        <tbody>
          <tr>
            <td>Käyttäjänimi</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td><input type="text" data-testid="email" value={email} onChange={(e) => setEmail(e.target.value)} /></td>
          </tr>
          <tr>
            <td>Puhelinnumero</td>
            <td><input type="text" data-testid="phone" value={phone} onChange={(e) => setPhone(e.target.value)} /></td>
          </tr>
        </tbody>
      </Table>
      <Button data-testid="save" onClick={() => saveChanges()}>Tallenna muutokset</Button>
    </Container>
  );
}

export default UserInfo;
