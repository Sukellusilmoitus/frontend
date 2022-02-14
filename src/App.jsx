import React, { useState, useEffect } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Header from './components/Navigation';
import ListAndNotification from './components/ListAndNotification';
import TargetPage from './components/TargetPage';
import wreckService from './services/wrecks';
import './App.css';
import NewTargetForm from './components/NewTargetForm';

function App() {
  const [targets, setTargets] = useState([]);

  const getTargets = async () => {
    const data = await wreckService.getAllWrecks();
    data.features.sort((a, b) => (a.properties.name > b.properties.name ? 1 : -1));
    setTargets(data.features);
  };

  useEffect(() => {
    getTargets();
  }, []);

  const match = useRouteMatch('/hylyt/:id');
  const target = match
    ? targets.find((t) => t.properties.id === Number(match.params.id))
    : null;

  return (
    <div className="container">
      <h1>Hylkysukellusilmoituspalvelu</h1>
      <Header />
      <Switch>
        <Route path="/hylyt/:id">
          <TargetPage target={target} />
        </Route>
        <Route path="/hylyt" component={ListAndNotification} />
        <Route path="/uusi" component={NewTargetForm} />
      </Switch>
    </div>
  );
}

export default App;
