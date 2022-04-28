import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import diveService from '../../services/dives';
import LoadingSpinner from '../LoadingSpinner';
import TargetPage from './TargetPage';
import targetservice from '../../services/targets';

function Target({ id }) {
  const [dives, setDives] = useState('loading...');
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

  const createNewNotification = (notification) => {
    diveService.create(notification);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getTarget();
  }, []);

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
    <>
      <Helmet>
        <title>{target.properties.name}</title>
        <meta name="description" content={`Tarkempia tietoja kohteesta ${target.properties.name}`} />
      </Helmet>
      <TargetPage
        target={target}
        createNewNotification={createNewNotification}
        dives={dives}
      />
    </>
  );
}

export default Target;
