import React, { useState, useEffect } from 'react';
import diveService from '../../services/dives';
import TargetPage from './TargetPage';

function Target({ target }) {
  const [dives, setDives] = useState([]);

  const getDives = async () => {
    if (target) {
      const data = await diveService.getAllByTarget(target.properties.id);
      setDives(data.data);
    }
  };

  const createNewNotification = (notification) => {
    diveService.create(notification);
  };

  useEffect(() => {
    getDives();
  }, [target]);

  if (!target) {
    return (
      <div>
        Kyseisellä id:llä ei löytynyt yhtään kohdetta, onhan käyttämäsi osoite oikea?
      </div>
    );
  }

  // this flips the coordinates because map takes them in order y, x
  target.geometry.coordinates.reverse();

  return (
    <TargetPage
      target={target}
      createNewNotification={createNewNotification}
      dives={dives}
    />
  );
}

export default Target;
