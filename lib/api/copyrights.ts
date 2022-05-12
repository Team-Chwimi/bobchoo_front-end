import { axiosInstance } from '.';

export const copyrightsAPI = () => axiosInstance.get(`/api/v1/info/copyrights`);
