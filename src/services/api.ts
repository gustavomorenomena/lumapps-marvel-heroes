import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
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
})
