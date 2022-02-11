import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './components/Navigation';
import ListAndNotification from './components/ListAndNotification';
import NotificationForm from './components/NotificationForm';

function App() {
  return (
    <div className="container">
      <h1>Hylkysukellusilmoituspalvelu</h1>
      <Router>
        <Header />
        <Switch>
          <Route path="/hylyt" component={ListAndNotification} />
          <Route path="/sukellusilmoitus/:id" component={NotificationForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
