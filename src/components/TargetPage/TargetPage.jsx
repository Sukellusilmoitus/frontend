import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NotificationForm from '../NewNotificationForm';
import TargetInfo from './TargetInfo';
import TargetLocationMap from './TargetLocationMap';
import DiveHistory from './DiveHistory';

function TargetPage({ target, createNewNotification, dives }) {
  return (
    <Container>
      <h2>{target.properties.name}</h2>
      <Row>
        <Col lg>
          <TargetInfo target={target} />
        </Col>
        <Col lg>
          <h3>Sijainti kartalla</h3>
          <TargetLocationMap target={target} />
        </Col>
      </Row>
      <Row style={{ marginTop: '80px' }}>
        <Col lg>
          <NotificationForm
            targetName={target.properties.name}
            targetId={target.properties.id}
            targetXcoordinate={target.geometry.coordinates[0]}
            targetYcoordinate={target.geometry.coordinates[1]}
            createNotification={createNewNotification}
          />
        </Col>
        <Col lg>
          <DiveHistory diveList={dives} />
        </Col>
      </Row>
    </Container>
  );
}

export default TargetPage;
