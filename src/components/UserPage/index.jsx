import React, { useState, useEffect } from 'react';
import diveService from '../../services/dives';
import LoadingSpinner from '../LoadingSpinner';
import UserPage from './UserPage';

function User({ user }) {
  const [dives, setDives] = useState('loading...');

  const getDives = async () => {
    if (user) {
      const data = await diveService.getAllByUser(user.username);
      setDives(data.data);
    }
  };

  useEffect(() => {
    getDives();
  }, [user]);

  if (user === null) {
    return (
      <LoadingSpinner />
    );
  }
  console.log('kätääjä ', user);
  if (user === undefined) {
    return (
      <div>
        Kyseistä suekltajaa ei löytynyt, onhan käyttämäsi osoite oikea?
      </div>
    );
  }

  return (
    <UserPage
      user={user}
      dives={dives}
    />
  );
}

export default User;
