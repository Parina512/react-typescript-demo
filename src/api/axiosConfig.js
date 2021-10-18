import Axios from 'axios';

const api = Axios.create({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8',
  },
});

export const apiGet = async (url, headers) => {
  return api.get(url, { headers });
};
