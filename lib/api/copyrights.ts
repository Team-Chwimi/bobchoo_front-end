import { axiosInstance } from '.';

import { InfoType } from '../../types/InfoType';

export const copyrightsAPI = () =>
  axiosInstance.get<InfoType[]>(`/info/copyrights`);
