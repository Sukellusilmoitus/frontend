import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAllTargets = () => {
  const request = axios.get(`${baseUrl}/api/data`);
  return request.then((response) => response.data);
};

<<<<<<< HEAD:src/services/wrecks.js
const postTarget = (newTarget) => {
  const request = axios.post(`${baseUrl}/api/targets`, newTarget);
  return request.data;
};

// TODO: implement backend check
const generateUniqueID = () => (Math.random() * 1e16).toString(36);

export default { getAllWrecks, postTarget, generateUniqueID };
=======
const getTarget = async (id) => {
  const response = await axios.get(`${baseUrl}/api/targets/${id}`);
  return response.data;
};

export default { getAllTargets, getTarget };
>>>>>>> master:src/services/targets.js
