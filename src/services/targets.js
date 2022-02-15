import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAllTargets = () => {
  const request = axios.get(`${baseUrl}/api/data`);
  return request.then((response) => response.data);
};

const getTarget = async (id) => {
  const response = await axios.get(`${baseUrl}/api/targets/${id}`);
  return response.data;
};

export default { getAllTargets, getTarget };
