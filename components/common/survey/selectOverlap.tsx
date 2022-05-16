import Link from 'next/link';

import { useEffect, useState } from 'react';

import { useSelector } from '../../../store';

import styled from '@emotion/styled';

interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
}
const SelectOverlap: React.FC<SelectProps> = ({qusetionId,answerList}) => {
  useEffect(() => {
  }, []);

  return (
    <Container>
      <Wrapper>
          <FoodDiv>
          {answerList && answerList.map((answer: string, index:number)=>(
            <FoodButton key={index}>{answer}</FoodButton>
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
`;

const FoodButton = styled.div`
  background: #F2F2F2;
  border-radius: 15px;
  width:40%;
  padding: 5% 0% 5% 0;
  float: left;
  margin-left: 3vw;
  margin-top: 4vh;
  text-align: center;

  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  color: #FF7B30;
`;

export default SelectOverlap;
