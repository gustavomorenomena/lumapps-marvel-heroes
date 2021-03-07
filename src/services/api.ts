import axios from 'axios';

export const Api = axios.create({
  baseURL: 'https://gateway.marvel.com/v1/public/',
  timeout: 1000,
  params: {
    apikey: process.env.REACT_APP_MARVEL_API_KEY
  }
});
