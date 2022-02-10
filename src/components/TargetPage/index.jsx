import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NotificationForm from '../NotificationForm';
import TargetInfo from './TargetInfo';
import diveService from '../../services/dives';
import TargetLocationMap from './TargetLocationMap';
import DiveHistory from './DiveHistory';

function TargetPage({ target }) {
  const createNewNotification = (notification) => {
    diveService.create(notification);
  };

  if (!target) return <div>Ei löytynyt</div>;

  return (
    <div>
      <Container>
        <h2>{target.properties.name}</h2>
        <Row>
          <Col>
            <TargetInfo target={target} />
          </Col>
          <Col>
            <TargetLocationMap target={target} />
          </Col>
        </Row>
        <Row>
          <Col>
            <DiveHistory diveList={[{ created_at: 'eilen' }]} />
          </Col>
          <Col>
            <NotificationForm
              wreckName={target.properties.name}
              wreckId={target.properties.id}
              createNotification={createNewNotification}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TargetPage;
