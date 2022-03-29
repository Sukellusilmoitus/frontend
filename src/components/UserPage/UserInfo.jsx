import React from 'react';
import {
  Container, Table,
} from 'react-bootstrap';

function UserInfo(props) {
  const {
    user,
  } = props;
  return (
    <Container style={{ paddingLeft: 0, paddingRight: 0 }}>
      <Table bordered size="sm">
        <tbody>
          <tr>
            <td>Käyttäjänimi</td>
            <td>{user.username}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
        </tbody>
      </Table>
    </Container>
  );
}

export default UserInfo;
