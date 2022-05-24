import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';

import { useSelector } from '../../store';
import { answerActions } from '../../store/answer';

import { AnswerType } from '../../types/answerType';

interface SelectProps {
  qusetionId: number;
  answerList: Array<string>;
  id: number;
}

interface style {
  float: string;
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
  const myAnswerList = useSelector((state) => state.answer.answerList);
  const clicked: Array<boolean> = new Array(questionTotal).fill(false);
  const [colorList, setColorList] = useState<boolean[]>(clicked);

  const [num, setNum] = useState<number>(id);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      setNum(Number(id) + 1);
    }
  }, []);

  // css 항목 왼쪽 오른쪽 끝 배치
  const floatFunc = (i: number) => {
    if (i % 2 === 0) {
      return 'left';
    } else {
      return 'right';
    }
  };
  // 클릭 여부 판단
  const handelClicked = (i: number) => {
    // console.log(clicked);
    let copy = [...colorList];
    copy[i] = !copy[i];
    setColorList(copy);
    // console.log(clicked, colorList);
  };

  const isClicked = (i: number) => {
    return clicked[i];
  };
  return (
    <Container>
      <Wrapper>
        <FoodDiv>
          {answerList &&
            answerList.map((answer: string, index: number) => (
              <div
                key={index}
                onClick={(event) => {
                  handelClicked(index);
                  // console.log(index, 'index');
                  // console.log(isClicked(index));
                }}
              >
                {colorList[index] ? (
                  <FoodButtonTrue className="button" float={floatFunc(index)}>
                    {answer}
                  </FoodButtonTrue>
                ) : (
                  <FoodButtonFalse className="button" float={floatFunc(index)}>
                    {answer}
                  </FoodButtonFalse>
                )}
              </div>
            ))}
          <NextButton
            onClick={() => {
              let myFoodAnswer: string[] = [];
              let cnt = 0;
              colorList.map((data, index) => {
                if (data) {
                  myFoodAnswer[cnt] = answerList[index];
                  cnt++;
                }
              });
              if (myFoodAnswer.length < 1) {
                alert('한개 이상 선택해 주세요!');
              } else {
                let result: AnswerType = {
                  questionId: qusetionId,
                  answer: myFoodAnswer,
                };
                let curAnswerList = [...myAnswerList];
                curAnswerList[id - 1] = result;
                dispatch(
                  answerActions.setAnswer({
                    lat: '',
                    lng: '',
                    answerList: curAnswerList,
                  }),
                );
                router.push(`/survey/${num}`);
                // console.log(num);
              }
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
  margin: 2vh 5% 0;
`;

const FoodButtonTrue = styled.div<style>`
  float: ${(props) => props.float};
  width: 45%;
  background: #ff7b30;
  margin-bottom: 4vh;
  padding: 5% 0% 5% 0;
  border-radius: 15px;
  cursor: pointer;
  font-style: normal;
  font-size: 25px;
  font-weight: 700;
  color: #ffffff;
  text-align: center;
`;

const FoodButtonFalse = styled.div<style>`
  float: ${(props) => props.float};
  width: 45%;
  padding: 5% 0% 5% 0;
  border-radius: 15px;
  margin-bottom: 4vh;
  background: #f2f2f2;
  cursor: pointer;
  font-style: normal;
  font-size: 25px;
  font-weight: 700;
  color: #ff7b30;
  text-align: center;
`;

const NextButton = styled.div`
  float: left;
  align-self: center;
  width: 100%;
  padding: 5% 0% 5% 0;
  cursor: pointer;
  border-radius: 15px;
  background: #ff7b30;
  color: #ffffff;
  font-style: normal;
  font-size: 25px;
  font-weight: 700;
  text-align: center;
`;

export default SelectOverlap;
