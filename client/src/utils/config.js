import axios from 'axios';

const request = axios.create({
  baseURL: 'http://localhost:3001/',
  headers: {
    Accept: 'application/vnd.booker.v1+json',
    "Content-Type": "application/json"
  }
});

export default request;