import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import CopyrightService from '../lib/api/copyrights';

import { InfoType } from '../types/InfoType';
import { ErrorResponse } from '../types/commonTypes';

const useCopyrights = () => {
  const queryFn = () => CopyrightService.getCopyrightsAPI();
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<InfoType[]>,
    AxiosError<ErrorResponse>
  >('copyrights', queryFn, {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retry: false,
  });

  return {
    isLoading,
    data: data?.data,
    isError,
    errorMessage: error?.response?.data.message,
  };
};

export default useCopyrights;
