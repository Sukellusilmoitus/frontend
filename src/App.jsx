import React from 'react';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Helmet from 'react-helmet';
import Header from './components/Navigation';
import Target from './components/TargetPage/index';
import UserPage from './components/UserPage';
import Home from './components/Home';
import targetService from './services/targets';
import NewTargetForm from './components/NewTargetForm';
import TargetList from './components/TargetList';
import './assets/styles/App.css';
import AdminPanel from './components/AdminPanel/AdminPanel';
import Feedback from './components/Feedback';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import { AuthVerify } from './services/users';

function App() {
  const createNewTarget = (newTarget) => {
    targetService.postTarget(newTarget);
  };

  useEffect(() => {
    getTargets();
  }, []);
  AuthVerify();

  const match = useRouteMatch('/hylyt/:id');
  const target = match && targets !== 'loading...'
    ? targets.find((t) => t.properties.id === match.params.id)
    : null;

  return (
    <div className="container">
      <Helmet>
        <title>Sukellusilmoitus</title>
        <meta name="description" content="Meriarkeologisen seuran sovellus sukellusilmoitusten tekemiseen" />
      </Helmet>
      <Header />
      <Switch>
        <Route exact path="/">
          <Redirect to="/etusivu" />
        </Route>
        <Route path="/etusivu" component={Home} />
        <Route
          exact
          path="/hylyt/:id"
          render={(props) => (
            <Target id={props.match.params.id} />
          )}
        />
        <Route path="/omasivu">
          <UserPage />
        </Route>
        <Route path="/hylyt">
          <TargetList />
        </Route>
        <Route path="/kirjaudu">
          <Login />
        </Route>
        <Route path="/uloskirjautuminen">
          <Logout />
        </Route>
        <Route path="/rekisteroidy">
          <Register />
        </Route>
        <Route path="/admin">
          <AdminPanel />
        </Route>
        <Route exact path="/uusi" render={() => <NewTargetForm postTarget={createNewTarget} />} />
        <Route exact path="/palaute">
          <Feedback />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
