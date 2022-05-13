import Link from 'next/link';

import { useSelector } from '../../../store';

import styled from '@emotion/styled';
import { useEffect } from 'react';
interface StoreDetailProps{
  id: number;
}
const Question: React.FC<StoreDetailProps> = ({id})=>{
  
  const data = useSelector((state) => state.question.questions);
  const qestionTotal = useSelector((state) => state.question.questionTotalCount);
  const dataDetail = data[id-1];
  useEffect(() => {
    console.log(dataDetail);
  }, []);

  
  return (
    <Container>
      <Wrapper>
        <QuestionDiv>
          <Title>{dataDetail.question}</Title>
            {dataDetail.overlap && <OverlapDiv>(중복 선택 가능)</OverlapDiv>}
        </QuestionDiv>
        <ImageWrapper src="/images/bobdol.gif" alt="밥돌이 이미지" />
        <GraphDiv>
          <GraphBack>
            <Graph goal={qestionTotal} total={id}></Graph>
          </GraphBack>
          <SubDiv>{id}/{qestionTotal}</SubDiv>
        </GraphDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;
const Wrapper = styled.div``;
const QuestionDiv = styled.div`
  width:60%;
  float: left; 
`;
const Title = styled.div`
  font-size: 30px;
  font-style: normal;
  font-weight: 800;
  margin-top:5vh;
  margin-left:2vh;
  word-break: keep-all;

`;
const OverlapDiv = styled.div`
  clear:both;
  margin-left:2vh;
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  margin-top:1vh;
  color: #797979;

`;
const ImageWrapper = styled.img`
  // width: 61px;
  height: 100px;
  float: right; 
  margin-top:3vh;
  margin-right:2vh;
`;

const GraphDiv = styled.div`
  clear:both;
  padding: 2vh;
`;
const GraphBack = styled.div`
  height: 10px;
  background-color: #FAAC69;
  border-radius: 10px;
`;

export const Graph = styled.div`
  z-index=0;
  position: relative;
  // top: -10px;
  height: 10px;
  background-color: #FF7B30;
  border-radius: 10px;
  width: ${(props) => {
    return (props.total / props.goal) * 100;
  }}%;
`;
const SubDiv = styled.div`
  float: right; 
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  color: #B9B9B9;
  margin-top:1vh;
`;

export default Question;
