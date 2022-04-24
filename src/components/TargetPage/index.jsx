import React, { useState, useEffect } from 'react';
import diveService from '../../services/dives';
import LoadingSpinner from '../LoadingSpinner';
import TargetPage from './TargetPage';

function Target({ target }) {
  const [dives, setDives] = useState('loading...');

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
    window.scrollTo(0, 0);
    getDives();
  }, [target]);

  if (target === null) {
    return (
      <LoadingSpinner />
    );
  }

  if (target === undefined) {
    return (
      <div>
        Kyseisellä id:llä ei löytynyt yhtään kohdetta, onhan käyttämäsi osoite oikea?
      </div>
    );
  }

  return (
    <TargetPage
      target={target}
      createNewNotification={createNewNotification}
      dives={dives}
    />
  );
}

export default Target;
