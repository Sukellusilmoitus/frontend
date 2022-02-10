import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAllWrecks = async () => {
  const response = await axios.get(`${baseUrl}/api/data`);
  return response.data;
};

const getWreck = async (id) => {
  const response = await axios.get(`${baseUrl}/api/targets/${id}`);
  return response.data;
};

export default { getAllWrecks, getWreck };
