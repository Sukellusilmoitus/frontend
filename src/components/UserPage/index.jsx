import React, { useState, useEffect } from 'react';
import diveService from '../../services/dives';
import targetService from '../../services/targets';
import LoadingSpinner from '../LoadingSpinner';
import UserPage from './UserPage';

function User({ user }) {
  const [dives, setDives] = useState('loading...');
  const [targetnotes, setTargetnotes] = useState('loading...');

  const getDives = async () => {
    if (user) {
      const data = await diveService.getAllByUser(user.username);
      setDives(data.data);
    }
  };

  const getTargetnotes = async () => {
    if (user) {
      const data = await targetService.getAllByUser(user.username);
      data.data.sort((a, b) => (a.target.properties.is_pending
        > b.target.properties.is_pending ? 1 : -1));
      console.log(data.data);
      setTargetnotes(data.data);
    }
  };

  useEffect(() => {
    getDives();
    getTargetnotes();
  }, [user]);

  if (user === null) {
    return (
      <LoadingSpinner />
    );
  }

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
      targetnotes={targetnotes}
    />
  );
}

export default User;
