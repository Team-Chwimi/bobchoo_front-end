import Link from 'next/link';

import { useEffect, useState, useMemo } from 'react';

import { useRouter } from 'next/router';

import { useSelector } from '../../store';

import styled from '@emotion/styled';

interface style{
  back : string;
  color: string;
  size: string;
}
interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
  id:number;
}
const SelectOne: React.FC<SelectProps> = ({qusetionId, answerList, id}) => {
  const router = useRouter();
  
  const questionTotal = useSelector(
    (state) => state.question.questionTotalCount,
  );
    
  const [num, setNum] = useState<number>(0);
  const plus=useMemo(()=>{
    if(id){
      return id
    }
  },[id])
  useEffect(() => {
    if(id){
      id++;
      setNum(id);
    }
  }, [plus]);


  const arrayBack = (index:number)=>{
    if(index===0){
      return '#FF7B30';
    }
    else{
      return '#F2F2F2';
    }
  }

  const arrayFont = (index:number)=>{
    if(index===0){
      return '#FFFFFF';
    }
    else{
      return '#FF7B30';
    }
  }

  const fontSize = ()=>{
    // console.log(num);
    if(num===questionTotal+1){
      return '50px';
    }else{
      return '80px';
    }
  }

  return (
    <Container>
      <Wrapper>
          <FoodDiv>
          {answerList && answerList.map((answer: string, index:number)=>(
            <FoodButton 
            key={index} 
            back = {arrayBack(index)}
            color={arrayFont(index)}
            size={fontSize()}
            onClick={(event) => {
              if(num===questionTotal+1){
                router.push(`/result`);
              }else{
                router.push(`/survey/${num}`);
              }
            }}>{answer}</FoodButton>
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
width:100%;
padding: 13% 0% 13% 0;
// float: left;
// margin-left: 3vw;
margin-top: 4vh;
text-align: center;
font-style: normal;
font-weight: 700;
font-size: ${(props) => props.size};
color:  ${(props) => props.color};
word-break: keep-all;
`;

const NextDiv = styled.div`
  align-items: center;
`;

const NextButton = styled.div`

`;

export default SelectOne;
