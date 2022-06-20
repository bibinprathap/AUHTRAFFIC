import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  "access-control-allow-origin" : "*",

};

const baseURL = process.env.REACT_APP_API_URL ||  'http://localhost:5300';

export const request = axios.create({
  baseURL,
  headers,
});

request.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

// update the response if required
request.interceptors.response.use(
  (res) => {
    console.log(`this is response iterceptor ${res}`);
    return res;
  },
  (error) => {
    if (error.response?.status === 401) {
      try {
      } catch (e) {}
    }
    return Promise.resolve(error.response);
  }
);
