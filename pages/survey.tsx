import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';
import { LatLngType } from '../types/Map';
import { latlngActions } from '../store/latlng';

import Header from '../components/common/header';
import Question from '../components/common/survey/question';
import axios from 'axios';
interface QuestionDataType {
  answerList: Array<string>;
  description: string;
  overlap: boolean;
  question: string;
  questionId: number;
  // openNow: boolean;
}

const Survey: NextPage = () => {
  // /survey/1
  const [questionData, setQuestionData] = useState<QuestionDataType[]>();
  const questionList: QuestionDataType[] = [];
  useEffect(() => {
    axios
    .get(process.env.NEXT_PUBLIC_SERVER_URL+"/surveys")
    .then((res) => {
      // console.log(res);
      setQuestionData(res.data.questionList);
      res.data.questionList.map((qes: any)=>{
        questionList.push({
          questionId: qes.questionId,
          question:qes.question,
          overlap: qes.overlap,      
          description: qes.description,  
          answerList: qes.answerList,
        });
      })
    })
  if(questionList.length>0){
    setQuestionData(questionList);
  }
  }, []);
  return (
    <Container>
      <Wrapper>
        <Header/>      
        <Question />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const Title = styled.h1``;

export default Survey;
