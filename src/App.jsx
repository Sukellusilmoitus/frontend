import React from 'react';
import {
  BrowserRouter as Router, Switch, Route,
} from 'react-router-dom';
import Header from './components/Navigation';
import ListAndNotification from './components/ListAndNotification';

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
