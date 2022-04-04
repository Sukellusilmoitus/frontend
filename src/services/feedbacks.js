import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/api/feedback/`);
  return response.data;
};

const create = async (newFeedback) => {
  const response = await axios.post(`${baseUrl}/api/feedback/`, newFeedback);
  return response.data;
};

export default {
  getAll,
  create,
};
