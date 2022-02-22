import React from 'react';
import MainMap from './MainMap';

function Home() {
  return (
    <div>
      <MainMap />
      <p>Tällä sivulla voit tehdä ilmoituksen sukelluksestasi ja kertoa havaintosi.</p>
      {/* Muuta etusivukamaa kuten "Viimeisimmät sukellukset:" tms. */}
    </div>
  );
}

export default Home;
