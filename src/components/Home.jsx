import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import MainMap from './MainMap';
import targetService from '../services/targets';
import PageTitle from './PageTitle';

function Home() {
  const [targets, setTargets] = useState([]);

  const getTargets = async () => {
    const data = await targetService.getAllTargets();
    setTargets(data.features);
  };

  useEffect(() => {
    getTargets();
  }, []);

  return (
    <Container>
      <PageTitle text="Hylyt kartalla" />
      <p>
        Etsimällä hylyn kartalta, pääset tekemään ilmoituksen sille suuntautuneesta sukelluksesta.
      </p>
      <div style={{ margin: 20 }} />
      <MainMap targets={targets} />
      <p data-testid="homepage-info">
        Tällä sivulla voit tehdä ilmoituksen sukelluksestasi ja kertoa havaintosi.
      </p>
    </Container>
  );
}

export default Home;
