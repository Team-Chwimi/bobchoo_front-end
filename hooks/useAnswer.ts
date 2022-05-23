import { AxiosResponse, AxiosError } from 'axios';

import { useQuery } from 'react-query';

import SurveyService from '../lib/api/surveys';

import { useSelector } from 'react-redux';
import { ErrorResponse } from '../types/commonTypes';
import {
  AnswerType,
  SurveyRequestType,
  SurveyResponseType,
} from '../types/answerType';

const useAnswer = (request: SurveyRequestType) => {
  const myAnswerList = useSelector<SurveyRequestType>(
    (state) => state.answerList,
  );
  request = { lat: '', lng: '', answerList: myAnswerList as AnswerType[] };

  const queryFn = () => SurveyService.postAnswerAPI(request);
  const { isLoading, data, isError, error } = useQuery<
    AxiosResponse<SurveyResponseType>,
    AxiosError<ErrorResponse>
  >('answer', queryFn, {
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

export default useAnswer;
