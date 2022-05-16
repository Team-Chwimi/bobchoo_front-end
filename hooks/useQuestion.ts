import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import SurveyService from '../lib/api/surveys';

import { ErrorResponse } from '../types/commonTypes';
import { QuestionResultType } from '../types/qestionType';

const useQuestion = () => {
  const queryFn = () => SurveyService.getQuestionAPI();
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<QuestionResultType>,
    AxiosError<ErrorResponse>
  >('question', queryFn, {
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

export default useQuestion;
