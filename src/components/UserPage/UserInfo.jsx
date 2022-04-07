import React from 'react';
import {
  Container, Table,
} from 'react-bootstrap';

function UserInfo({ user }) {
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
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Puhelinnumero</td>
            <td>{user.phone}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default UserInfo;
