import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginRequest } from '../../services/users';
import LoginForm from './LoginForm';

function Login() {
  const [alert, setAlert] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      history.push('/');
    }
  }, []);

  const addAlert = (text) => {
    setAlert(text);
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleSubmit = async (username, password) => {
    try {
      const res = await loginRequest(username, password);
      if (res.auth) {
        localStorage.setItem('auth', res.auth);
        history.push('/');
      } else {
        addAlert('Väärä käyttäjätunnus tai salasana');
      }
    } catch (e) {
      addAlert('Väärä käyttäjätunnus tai salasana');
    }
  };

  return (
    <LoginForm
      handleSubmit={handleSubmit}
      alert={alert}
    />
  );
}

export default Login;
