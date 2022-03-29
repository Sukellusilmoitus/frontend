import React, { useState, useEffect } from 'react';
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
} from 'react-router-dom';
import Header from './components/Navigation';
import TargetPage from './components/TargetPage';
import UserPage from './components/UserPage';
import Home from './components/Home';
import targetService from './services/targets';
import { getAllUsers } from './services/users';
import NewTargetForm from './components/NewTargetForm';
import TargetList from './components/TargetList';
import './assets/styles/App.css';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [targets, setTargets] = useState('loading...');
  const [users, setUsers] = useState('loading...');

  const getTargets = async () => {
    const data = await targetService.getAllTargets();
    data.features.sort((a, b) => (a.properties.name > b.properties.name ? 1 : -1));
    // console.log(data.features);
    setTargets(data.features);
  };

  const getUsers = async () => {
    const data = await getAllUsers();
    // console.log(data.data);
    setUsers(data.data);
  };

  const createNewTarget = (newTarget) => {
    targetService.postTarget(newTarget);
  };

  useEffect(() => {
    getTargets();
    getUsers();
  }, []);

  const match = useRouteMatch('/hylyt/:id');
  const target = match && targets !== 'loading...'
    ? targets.find((t) => t.properties.id === match.params.id)
    : null;

  const matchUser = useRouteMatch('/sukeltaja/:username');
  const user = matchUser && users !== 'loading...'
    ? users.find((u) => u.username === matchUser.params.username)
    : null;

  return (
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/etusivu" />
        </Route>
        <Route path="/etusivu" component={Home} />
        <Route path="/hylyt/:id">
          <TargetPage target={target} />
        </Route>
        <Route path="/sukeltaja/:username">
          <UserPage user={user} />
        </Route>
        <Route path="/hylyt">
          <TargetList targets={targets} />
        </Route>
        <Route path="/kirjaudu">
          <Login />
        </Route>
        <Route path="/rekisteroidy">
          <Register />
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
