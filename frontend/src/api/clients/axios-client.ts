import axios, { AxiosError } from 'axios';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
     Accept: 'application/json'
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  }
);

export default axiosClient;
