import React, { useState, useEffect } from 'react';
import axios from 'axios';
import REACT_APP_SERVER_URL from './util/config';
import NotificationForm from './components/notificationForm';
import WreckList from './pages/WreckList';

function App() {
  const [message, setMessage] = useState('loading...');

  useEffect(() => {
    axios
      .get(`${REACT_APP_SERVER_URL}/api/helloworld`)
      .then((response) => {
        setMessage(response.data.message);
      });
  }, []);

  return (
    <div>
      <h1>Hylkusukellusilmoituspalvelu</h1>
      {message}
      <NotificationForm />
      <WreckList />
    </div>
  );
}

export default App;
