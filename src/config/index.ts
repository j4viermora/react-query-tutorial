import axios from 'axios';

export const hobbyRequest = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
