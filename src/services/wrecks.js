import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAllWrecks = () => {
  const request = axios.get(`${baseUrl}/api/data`);
  return request.then((response) => response.data);
};

const postTarget = (newTarget) => {
  const request = axios.post(`${baseUrl}/api/targets`, newTarget);
  return request.data;
};

// TODO: implement backend check
const generateUniqueID = () => (Math.random() * 1e16).toString(36);

export default { getAllWrecks, postTarget, generateUniqueID };
