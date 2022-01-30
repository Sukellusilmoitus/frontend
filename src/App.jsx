import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import NotificationForm from './components/notificationForm';
import Wreckslist from './components/wrecksList';
import Header from './components/navigation';

function App() {
  return (
    <div className="container">
      <h1>Hylkysukellusilmoituspalvelu</h1>
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
