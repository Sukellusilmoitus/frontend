import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './components/navigation';
import ListAndNotification from './components/listAndNotification';

function App() {
  return (
    <div className="container">
      <h1>Hylkysukellusilmoituspalvelu</h1>
      <Router>
        <Header />
        <Switch>
          <Route path="/hylyt" component={ListAndNotification} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
