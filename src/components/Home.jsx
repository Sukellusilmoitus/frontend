import React, { useState, useEffect } from 'react';
import MainMap from './MainMap';
import targetService from '../services/targets';

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
    <div>
      <MainMap targets={targets} />
      <p>Tällä sivulla voit tehdä ilmoituksen sukelluksestasi ja kertoa havaintosi.</p>
      {/* Muuta etusivukamaa kuten "Viimeisimmät sukellukset:" tms. */}
    </div>
  );
}

export default Home;
