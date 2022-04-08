import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserInfo from './UserInfo';
import UserTargetLocationMap from './UserTargetLocationMap';
import UserDiveHistory from './UserDiveHistory';
import UserTargetnotes from './UserTargetnotes';

function UserPage({ user, dives, targetnotes }) {
  return (
    <Container>
      <Row>
        <Col lg>
          <h3>{user.username}</h3>
          <UserInfo
            user={user}
          />
        </Col>
        <Col lg>
          <h3>Sukellukset kartalla</h3>
          <UserTargetLocationMap dives={dives} />
        </Col>
      </Row>
      <Row style={{ marginTop: '80px' }}>
        <Col lg>
          <h3>Ilmoitetut hylyt</h3>
          <UserTargetnotes targetnotes={targetnotes} />
        </Col>
        <Col lg>
          <UserDiveHistory dives={dives} />
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
