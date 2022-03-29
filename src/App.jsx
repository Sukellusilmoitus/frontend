import React, { useState, useEffect, useMemo } from 'react';
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
import NewTargetForm from './components/NewTargetForm';
import TargetList from './components/TargetList';
import './assets/styles/App.css';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Login from './components/Login';
import Register from './components/Register';
import UserContext from './UserContext';

function App() {
  const [targets, setTargets] = useState('loading...');
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  const getTargets = async () => {
    const data = await targetService.getAllTargets();
    data.features.sort((a, b) => (a.properties.name > b.properties.name ? 1 : -1));
    setTargets(data.features);
  };

  const createNewTarget = (newTarget) => {
    targetService.postTarget(newTarget);
  };

  useEffect(() => {
    getTargets();
  }, []);

  const match = useRouteMatch('/hylyt/:id');
  const target = match && targets !== 'loading...'
    ? targets.find((t) => t.properties.id === match.params.id)
    : null;

  return (
    <div className="container">
      <Header />
      <Switch>
        <UserContext.Provider value={value}>
          <Route exact path="/">
            <Redirect to="/etusivu" />
          </Route>
          <Route path="/etusivu" component={Home} />
          <Route path="/hylyt/:id">
            <TargetPage target={target} />
          </Route>
          <Route path="/omasivu">
            <UserPage />
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
        </UserContext.Provider>
      </Switch>
    </div>
  );
}

export default App;
