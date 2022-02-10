import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import NotificationForm from '../NotificationForm';
import TargetInfo from './TargetInfo';
import diveService from '../../services/dives';
import TargetLocationMap from './TargetLocationMap';
import DiveHistory from './DiveHistory';

function TargetPage({ target }) {
  const [dives, setDives] = useState([]);

  const getDives = async () => {
    const data = await diveService.getAllByTarget(target.properties.id);
    setDives(data.data);
  };

  useEffect(() => {
    getDives();
  }, []);

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
            <h3>Tietoja</h3>
            <TargetInfo target={target} />
          </Col>
          <Col>
            <h3>Sijainti kartalla</h3>
            <TargetLocationMap target={target} />
          </Col>
        </Row>
        <Row style={{ marginTop: '40px' }}>
          <Col>
            <NotificationForm
              wreckName={target.properties.name}
              wreckId={target.properties.id}
              createNotification={createNewNotification}
            />
          </Col>
          <Col>
            <h3>Sukellushistoria</h3>
            <DiveHistory diveList={dives} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default TargetPage;
