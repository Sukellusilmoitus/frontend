import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/dives`);
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

export default {
  getAll,
  create,
  getAllByTarget,
};
