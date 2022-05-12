import Link from 'next/link';

import { useSelector } from '../../../store';

import styled from '@emotion/styled';
import { useEffect } from 'react';
interface StoreDetailProps{
  id: number;
}
const Question: React.FC<StoreDetailProps> = ({id})=>{
  
  const data = useSelector((state) => state.question.questions);
  const dataDetail = data[id-1];
  useEffect(() => {
    console.log(dataDetail);
  }, []);

  
  return (
    <Container>
      <Wrapper>
        <QuestionDiv>
          <Title>{dataDetail.question}</Title>
          <ImageWrapper src="/images/bobdol.gif" alt="밥돌이 이미지" />
        </QuestionDiv>
      </Wrapper>
    </Container>
  );
};
const Container = styled.div``;
const Wrapper = styled.div``;
const QuestionDiv = styled.div``;
const Title = styled.div`
  font-size: 20px;
  font-style: normal;
  font-weight: 800;
  margin-top:2vh;
`;
const ImageWrapper = styled.img`
  // width: 61px;
  height: 61px;
`;

export default Question;
