import axios from 'axios';

const baseUrl = 'http://127.0.0.1:5000/api/getdata';

const getAllWrecks = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export default { getAllWrecks };
