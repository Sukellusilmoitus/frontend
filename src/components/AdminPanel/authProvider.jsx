import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_ERROR,
  AUTH_CHECK,
} from 'react-admin';
import { loginRequest } from '../../services/users';

const handleLogin = async (username, password) => {
  try {
    const res = await loginRequest(username, password);
    if (res.auth) {
      localStorage.setItem('auth', res.auth);
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
  return false;
};

const authProvider = async (type, params) => {
  if (type === AUTH_LOGIN) {
    const { username, password } = params;
    await handleLogin(username, password);
    return Promise.resolve();
  }
  if (type === AUTH_LOGOUT) {
    localStorage.removeItem('auth');
    return Promise.resolve();
  }
  if (type === AUTH_ERROR) {
    const { status } = params;
    if (status === 401 || status === 403) {
      localStorage.removeItem('auth');
      return Promise.reject();
    }
    return Promise.resolve();
  }
  if (type === AUTH_CHECK) {
    return localStorage.getItem('auth')
      ? Promise.resolve()
      : Promise.reject();
  }
  return Promise.reject(new Error('Unknown Method'));
};
export default authProvider;
