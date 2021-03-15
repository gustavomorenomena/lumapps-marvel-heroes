import axios from 'axios';

export const Api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  timeout: 1000,
  params: {
    apikey: process.env.REACT_APP_MARVEL_API_KEY
  }
});

Api.interceptors.response.use(response => {
  if ( ! response || response.status !== 200 || ! response.data ) {
    return Promise.reject('BAD_REQUEST');
  }

  return Promise.resolve(response.data);
}, (error) => {
  console.error(error);
  if (!error || typeof error === 'string' ) {
    return Promise.reject(error);
  }
  if (error.message) {
    return Promise.reject(error.message);
  }
  return Promise.reject(JSON.stringify(error));
});
