import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './components/Navigation';
import ListAndNotification from './components/ListAndNotification';
import NewTargetForm from './components/NewTargetForm';

function App() {
  return (
    <div className="container">
      <h1>Hylkysukellusilmoituspalvelu</h1>
      <Router>
        <Header />
        <Switch>
          <Route path="/hylyt" component={ListAndNotification} />
          <Route path="/uusi" component={NewTargetForm} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
