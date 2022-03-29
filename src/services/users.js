import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

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

const getAllUsers = () => {
  const request = axios.get(`${baseUrl}/api/users`);
  return request.then((response) => response.data);
};

export { loginRequest, registerRequest, getAllUsers };
