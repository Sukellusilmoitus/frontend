import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import formatcoords from 'formatcoords';
import NotificationForm from '../NotificationForm';
import TargetInfo from './TargetInfo';
import TargetLocationMap from './TargetLocationMap';
import DiveHistory from './DiveHistory';
import PageTitle from '../PageTitle';

function TargetPage({ target, createNewNotification, dives }) {
  const coordinatesDMS = formatcoords(
    target.geometry.coordinates[0],
    target.geometry.coordinates[1],
  ).format();
  return (
    <Container>
      <PageTitle text={target.properties.name} />
      <Row>
        <Col lg>
          <TargetInfo
            target={target}
            coordinatesDMS={coordinatesDMS}
          />
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
            coordinatesDMS={coordinatesDMS}
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
