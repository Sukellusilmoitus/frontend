import React, { useState, useEffect } from 'react';
import diveService from '../../services/dives';
import LoadingSpinner from '../LoadingSpinner';
import TargetPage from './TargetPage';
import targetservice from '../../services/targets';

function Target({ id }) {
  const [dives, setDives] = useState([]);
  const [target, setTarget] = useState(null);

  const getTarget = async () => {
    if (id === undefined) {
      setTarget(undefined);
    } else if (id === null) {
      setTarget(null);
    } else {
      const data = await targetservice.getTarget(id);
      if (data.data === null) {
        setTarget(undefined);
      } else {
        setTarget(data.data.target);
        setDives(data.data.dives);
      }
    }
  };

  useEffect(() => {
    getTarget();
  }, []);

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
