import axios from 'axios';
import REACT_APP_SERVER_URL from '../util/config';

const baseUrl = REACT_APP_SERVER_URL;

const getAllTargets = () => {
  const request = axios.get(`${baseUrl}/api/targets`);
  return request.then((response) => response.data);
};

const getTarget = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/api/targets/${id}`);
    return response.data;
  } catch {
    return null;
  }
};

const postTarget = (newTarget) => {
  const request = axios.post(`${baseUrl}/api/targets`, newTarget);
  return request.data;
};

const generateUniqueID = async () => {
  const id = (Math.random() * 1e16).toString(36);
  const target = await getTarget(id);
  if (target === null || target.data.length === 0) {
    return id;
  }
  return null;
};

export default {
  getAllTargets, getTarget, postTarget, generateUniqueID,
};
