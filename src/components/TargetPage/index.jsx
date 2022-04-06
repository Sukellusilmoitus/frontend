import React, { useState, useEffect } from 'react';
import diveService from '../../services/dives';
import LoadingSpinner from '../LoadingSpinner';
import TargetPage from './TargetPage';
import targetservice from '../../services/targets';

function Target(props) {
  const [dives, setDives] = useState([]);
  const [target, setTarget] = useState(null);

  const getTarget = async () => {
    const data = await targetservice.getTarget(props.match.params.id);
    if (data.data === null) {
      setTarget(undefined);
    } else {
      setTarget(data.data.target);
      setDives(data.data.dives);
    }
  };

  useEffect(() => {
    getTarget();
  }, []);

  const createNewNotification = (notification) => {
    diveService.create(notification);
  };

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
