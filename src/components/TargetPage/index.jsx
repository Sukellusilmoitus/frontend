import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
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
