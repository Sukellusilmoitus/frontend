import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Navigation';
import Target from './components/TargetPage/index';
import Home from './components/Home';
import targetService from './services/targets';
import NewTargetForm from './components/NewTargetForm';
import TargetList from './components/TargetList';
import './assets/styles/App.css';
import AdminPanel from './components/AdminPanel/AdminPanel';

function App() {
  const createNewTarget = (newTarget) => {
    targetService.postTarget(newTarget);
  };

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/etusivu" />
        </Route>
        <Route path="/etusivu" component={Home} />
        <Route path="/hylyt/:id" component={Target}>
          {/* <TargetPage /> */}
        </Route>
        <Route path="/hylyt">
          <TargetList />
        </Route>
        <Route path="/admin">
          <AdminPanel />
        </Route>
        <Route exact path="/uusi" render={() => <NewTargetForm postTarget={createNewTarget} />} />
      </Switch>
    </div>
  );
}

export default App;
