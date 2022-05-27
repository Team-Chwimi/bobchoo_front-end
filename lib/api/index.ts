import axios from 'axios';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
      'Access-Control-Allow-Origin': '*',
      'Accept': 'application/json',
    },
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
