import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import REACT_APP_SERVER_URL from './util/config';
import NotificationForm from './components/notificationForm';
import Wreckslist from './components/wrecksList';
import Header from './components/navigation';

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
    <div className="container">
      <h1>Hylkysukellusilmoituspalvelu</h1>
      {message}
      <Router>
        <Header />
        <Switch>
          <Route path="/hylyt" component={Wreckslist} />
          <Route path="/sukellusilmoitus" component={NotificationForm} />
        </Switch>
      </Router>
      <NotificationForm createNotification={() => {}} />
    </div>
  );
}

export default App;
