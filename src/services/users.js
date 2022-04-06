import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const loggedUser = () => {
  try {
    const token = localStorage.getItem('auth');
    const tokenUserData = JSON.parse(atob(token.split('.')[1]));
    return tokenUserData;
  } catch {
    return null;
  }
};

const loginRequest = async (username, password) => {
  const request = await axios.post(`${baseUrl}/api/login`, { username, password });
  return request.data;
};

const registerRequest = async (username, password, name, email, phone) => {
  const request = await axios.post(
    `${baseUrl}/api/register`,
    {
      username, password, name, email, phone,
    },
  );
  return request.data;
};

const updateUser = async (user) => {
  const headers = {
    'X-ACCESS-TOKEN': localStorage.getItem('auth'),
  };
  const req = await axios.put(`${baseUrl}/api/updateUser`, user, { headers });
  return req.data;
};

export {
  loginRequest, registerRequest, loggedUser, updateUser,
};
