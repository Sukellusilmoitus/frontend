import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAll = async () => {
  const headers = {
    'X-ACCESS-TOKEN': localStorage.getItem('auth'),
  };
  const response = await axios.get(`${baseUrl}/api/dives`, { headers });
  return response.data;
};

const create = async (newDive) => {
  const response = await axios.post(`${baseUrl}/api/dives`, newDive);
  return response.data;
};

const getAllByTarget = async (targetId) => {
  const response = await axios.get(`${baseUrl}/api/dives/target/${targetId}`);
  return response.data;
};

const getAllByUser = async (username) => {
  const headers = {
    'X-ACCESS-TOKEN': localStorage.getItem('auth'),
  };
  const response = await axios.get(`${baseUrl}/api/dives/user/${username}`, { headers });
  return response.data;
};

export default {
  getAll,
  create,
  getAllByTarget,
  getAllByUser,
};
