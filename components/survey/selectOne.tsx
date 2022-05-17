import Link from 'next/link';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import { useSelector } from '../../store';

import styled from '@emotion/styled';

interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
  id:number;
}
const SelectOne: React.FC<SelectProps> = ({qusetionId, answerList, id}) => {
  const router = useRouter();
  const [num, setNum] = useState<number>(0);
  useEffect(() => {
    if(id){
      setNum(id++);
    }
  }, []);

  return (
    <Container>
      <Wrapper>
          <FoodDiv>
          {answerList && answerList.map((answer: string, index:number)=>(
            <FoodButton key={index}>{answer}</FoodButton>
            ))}
          </FoodDiv>
          <NextDiv>
            <NextButton onClick={(event) => {
              router.push(`/survey/${num}`);
        }}>다음</NextButton>
          </NextDiv>
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
// margin-left: 3vw;
margin-top: 4vh;
text-align: center;

font-style: normal;
font-weight: 700;
font-size: 25px;
color: #FF7B30;
`;

const NextDiv = styled.div`
  align-items: center;
`;

const NextButton = styled.div`

`;

export default SelectOne;
