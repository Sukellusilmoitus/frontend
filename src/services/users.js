import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const loginRequest = async (username, password) => {
  const request = await axios.post(`${baseUrl}/api/login`, { username, password });
  return request.data;
};

export default loginRequest;
