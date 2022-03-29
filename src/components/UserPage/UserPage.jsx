import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import UserInfo from './UserInfo';
import UserTargetLocationMap from './UserTargetLocationMap';
import DiveHistory from './UserDiveHistory';

function UserPage({ user, dives }) {
  return (
    <Container>
      <h2>{user.name}</h2>
      <Row>
        <Col lg>
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
          <p>ILMOlomake</p>
        </Col>
        <Col lg>
          <DiveHistory dives={dives} />
        </Col>
      </Row>
    </Container>
  );
}

export default UserPage;
