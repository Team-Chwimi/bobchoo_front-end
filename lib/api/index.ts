import axios from 'axios';

const createAxiosInstance = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  });

  return axiosInstance;
};

export const axiosInstance = createAxiosInstance();
