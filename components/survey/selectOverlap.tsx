import Link from 'next/link';

import { useEffect, useState, useMemo } from 'react';


import { useRouter } from 'next/router';

import { useSelector } from '../../store';

import styled from '@emotion/styled';

interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
  id: number;
}
interface style {
  float: string;
  back:string;
}
const SelectOverlap: React.FC<SelectProps> = ({
  qusetionId,
  answerList,
  id,
}) => {
  const router = useRouter();
  const questionTotal = useSelector(
    (state) => state.question.questionTotalCount,
  );
  const clicked :Array<boolean> = new Array(questionTotal).fill(false);

  const [num, setNum] = useState<number>(0);

 const change  = useMemo(()=>{
    return handelClicked;
 },[])
  useEffect(() => {
    if (id) {
      setNum(id++);
    }
    change
  }, [change,id]);

  // css 항목 왼쪽 오른쪽 끝 배치
  const floatFunc = (i: number) => {
    if (i % 2 === 0) {
      return 'left';
    } else {
      return 'right';
    }
  };
  const back = (i: number) => {
    if (clicked[i]) {
      return '#000000';
    } else {
      return '#FFFFFF';
    }
  };
  // 클릭 여부 판단
  const handelClicked = (i: number)=>{
    console.log(clicked);
    if(clicked[i]===false){
      clicked[i] = true;
    }else{
      clicked[i] = false;
    }
  }

  const isClicked = (i:number)=>{
    return clicked[i];
  }
  return (
    <Container>
      <Wrapper>
        <FoodDiv>
          {answerList &&
            answerList.map((answer: string, index: number) => (
              <div key={index}>
                
                <FoodButtonTrue
                    className='button'
                    float={floatFunc(index)}
                    back = {back(index)}
                    onClick={(event) => {
                      handelClicked(index);
                      console.log(index,"index");
                      console.log(isClicked(index));
                    }}
                  >
                    {answer}
                  </FoodButtonTrue>

                  {/* <style jsx>
                  {`
                    .button{
                      background: ${isClicked(index) ?  '#FF7B30': '#F2F2F2'};
                      color: ${isClicked(index) ?  '#FFFFFF': '#FF7B30'};
                    }
                  `}
                  </style> */}
                {/* { isClicked(index) ?
                  <FoodButtonTrue
                    className='button'
                    float={floatFunc(index)}
                    onClick={(event) => {
                      handelClicked(index);
                      console.log(index,"index");
                      console.log(isClicked(index));
                    }}
                  >
                    {answer}
                  </FoodButtonTrue>
                  :
                  <FoodButtonFalse
                  className='button'
                  float={floatFunc(index)}
                  onClick={(event) => {
                    handelClicked(index);
                    console.log(index,"index");
                    // console.log(isClicked(index));
                  }}
                >
                  {answer}
                </FoodButtonFalse> */}
                {/* } */}
              </div>
            ))}
          <NextButton
            onClick={(event) => {
              router.push(`/survey/${num}`);
            }}
          >
            다음
          </NextButton>
        </FoodDiv>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div``;

const FoodDiv = styled.div`
  margin-left: 5%;
  margin-right: 5%;
  margin-top: 2vh;
`;

const FoodButtonTrue = styled.div<style>`
  background:${(props) => props.back};
  // color: #ffffff;
  border-radius: 15px;
  width: 45%;
  padding: 5% 0% 5% 0;
  float: ${(props) => props.float};
  margin-bottom: 4vh;
  text-align: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
`;
const FoodButtonFalse = styled.div<style>`
  background: #F2F2F2;
  color: #FF7B30;
  border-radius: 15px;
  width: 45%;
  padding: 5% 0% 5% 0;
  float: ${(props) => props.float};
  margin-bottom: 4vh;
  text-align: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
`;

const NextButton = styled.div`
  cursor: pointer;
  float: left;
  align-self: center;
  text-align: center;
  border-radius: 15px;
  width: 100%;
  padding: 5% 0% 5% 0;

  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  color: #ffffff;
  background: #ff7b30;
`;

export default SelectOverlap;
