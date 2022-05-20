import Link from 'next/link';

import { useEffect, useState, useMemo } from 'react';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';

import { useDispatch } from 'react-redux';
import { useSelector } from '../../store';

import { answerActions } from '../../store/answer';
import { selectedFoodListActions } from '../../store/selectedFoodList';
import { selectedFoodActions } from '../../store/selectedFood';
import {
  AnswerType,
  SurveyRequestType,
  SurveyResponseType,
} from '../../types/answerType';
import axios from 'axios';

import useAnswer from '../../hooks/useAnswer';

import styled from '@emotion/styled';
import { axiosInstance } from '../../lib/api';
import { requestTypeActions } from '../../store/requestType';
import { warningTypeActions } from '../../store/warning';

interface style {
  back: string;
  color: string;
  size: string;
}
interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
  id: number;
}
const SelectOne: React.FC<SelectProps> = ({ qusetionId, answerList, id }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const questionTotal = useSelector(
    (state) => state.question.questionTotalCount,
  );

  const myAnswerList = useSelector((state) => state.answer.answerList);

  const [num, setNum] = useState<number>(0);
  const plus = useMemo(() => {
    if (id) {
      return id;
    }
  }, [id]);
  useEffect(() => {
    if (id) {
      setNum(Number(id) + 1);
    }
  }, [plus]);

  const arrayBack = (index: number) => {
    if (index === 0) {
      return '#FF7B30';
    } else {
      return '#F2F2F2';
    }
  };

  const arrayFont = (index: number) => {
    if (index === 0) {
      return '#FFFFFF';
    } else {
      return '#FF7B30';
    }
  };

  const fontSize = () => {
    // console.log(num);
    if (num === questionTotal + 1) {
      return '50px';
    } else {
      return '80px';
    }
  };
  const postOneApi = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/surveys/results`,
      request,
    );
    return response;
  };

  const postMultiApi = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/surveys/results/list`,
      request,
    );
    return response.data;
  };

  const postRandomAPI = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/random/results`,
      request,
    );
    return response.data;
  };

  const postRandomListAPI = async (request: string) => {
    const response = await axiosInstance.post(
      `/api/v1/random/results/list`,
      request,
    );
    return response.data;
  };

  const request = { lat: '', lng: '', answerList: myAnswerList };
  const obj = JSON.stringify(request);

  const handleOneData = async () => {
    const response = await postOneApi(obj);
    console.log(response);
    if (response.status === 404) {
    } else {
      dispatch(
        selectedFoodActions.setSelectedFood({
          foodName: response.data.foodName,
          foodImg: response.data.foodImg,
        }),
      );
    }
  };

  const handleMultipleData = async () => {
    const data = await postMultiApi(obj);
    console.log(data);
    if (data.length === 0) {
      dispatch(
        warningTypeActions.setWarningType({
          type: 'noData',
        }),
      );
    } else {
      dispatch(
        selectedFoodListActions.setSelectedFoodList({
          foodList: data,
        }),
      );
    }
    return data.length;
  };

  const handleRandomOneData = async () => {
    const randomRequest = { lat: '', lng: '' };
    const data = await postRandomAPI(JSON.stringify(randomRequest));
    console.log(data);
    dispatch(
      selectedFoodActions.setSelectedFood({
        foodName: data.foodName,
        foodImg: data.foodImg,
      }),
    );
  };

  const handleRandomMultipleData = async () => {
    const randomRequest = { lat: '', lng: '' };
    const data = await postRandomListAPI(JSON.stringify(randomRequest));
    console.log(data);
    dispatch(
      selectedFoodListActions.setSelectedFoodList({
        foodList: data,
      }),
    );
  };

  return (
    <Container>
      <Wrapper>
        <FoodDiv>
          {answerList &&
            answerList.map((answer: string, index: number) => (
              <FoodButton
                key={index}
                back={arrayBack(index)}
                color={arrayFont(index)}
                size={fontSize()}
                onClick={(event) => {
                  if (num === questionTotal + 1) {
                    //하나만 선택할 때
                    console.log(obj, 'obj');

                    if (questionTotal === 1) {
                      dispatch(
                        requestTypeActions.setRequestType({
                          type: 'random',
                        }),
                      );
                      if (index === 0) {
                        handleRandomOneData().then(() => {
                          router.push(`/result`);
                        });
                      }
                      //여러개 선택할 때
                      else {
                        handleRandomMultipleData().then(() => {
                          router.push(`/results`);
                        });
                      }
                    } else {
                      dispatch(
                        requestTypeActions.setRequestType({
                          type: 'survey',
                        }),
                      );
                      if (index === 0) {
                        handleOneData().then(() => {
                          router.push(`/result`);
                        });
                      }
                      //여러개 선택할 때
                      else {
                        handleMultipleData().then((value) => {
                          if (value === 0) {
                            router.push('/warning');
                          } else {
                            router.push(`/results`);
                          }
                        });
                      }
                    }
                  } else {
                    if (index === 0) {
                      let result: AnswerType = {
                        questionId: qusetionId,
                        answer: ['YES'],
                      };
                      let curAnswerList = [...myAnswerList];
                      curAnswerList[curAnswerList.length] = result;
                      dispatch(
                        answerActions.setAnswer({
                          lat: '',
                          lng: '',
                          answerList: curAnswerList,
                        }),
                      );
                    } else {
                      // dispatch(
                      //   answerActions.setAnswer({
                      //     lat: '',
                      //     lng: '',
                      //     answerList: myAnswerList,
                      //   }),
                      // );
                    }
                    router.push(`/survey/${num}`);
                  }
                }}
              >
                {answer}
              </FoodButton>
            ))}
        </FoodDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div``;

const FoodDiv = styled.div`
  align-items: center;
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2vh;
`;

const FoodButton = styled.div<style>`
  background: ${(props) => props.back};
  border-radius: 15px;
  width: 100%;
  padding: 13% 0% 13% 0;
  // float: left;
  // margin-left: 3vw;
  margin-top: 4vh;
  text-align: center;
  font-style: normal;
  font-weight: 700;
  font-size: ${(props) => props.size};
  color: ${(props) => props.color};
  word-break: keep-all;
  cursor: pointer;
`;

const NextDiv = styled.div`
  align-items: center;
`;

const NextButton = styled.div``;

export default SelectOne;
