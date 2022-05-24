import { useEffect, useState, useMemo } from 'react';

import styled from '@emotion/styled';

import { useSelector } from '../../store';

import ModalBase from '../../components/common/ModalBase';
import CardModal from '../../components/UI/CardModal';
import SelectOverlap from './selectOverlap';
import SelectOne from './selectOne';

import { QuestionType } from '../../types/qestionType';

interface QuestionProps {
  id: number;
}

interface GraphProps {
  total: number;
  index: number;
}

const Question: React.FC<QuestionProps> = ({ id }) => {
  const data = useSelector((state) => state.question.questions[id - 1]);

  const questionTotal = useSelector(
    (state) => state.question.questionTotalCount,
  );

  const [isActive, setIsActive] = useState(false);

  const onClickModalOn = () => {
    setIsActive(true);
  };

  const onClickModalOff = () => {
    setIsActive(false);
  };

  const onClickCardRemove = () => {
    alert('이벤트 실행');
  };
  return (
    <Container>
      <Wrapper>
        {!data ? (
          <></>
        ) : (
          <>
            {data.description !== null && (
              <>
                <CopyrightImgWrapper>
                  <CopyrightImg
                    src="/images/question_icon.png"
                    alt="정보 로고"
                    onClick={onClickModalOn}
                  />
                </CopyrightImgWrapper>
                <ModalBase active={isActive} closeEvent={onClickModalOff}>
                  <CardModal
                    closeEvent={onClickModalOff}
                    title={data.question}
                    actionMsg="질문"
                    actionEvent={onClickCardRemove}
                  >
                    {data.description}
                  </CardModal>
                </ModalBase>
              </>
            )}
            <QuestionDiv>
              <Title>{data.question}</Title>
              {data.overlap && <OverlapDiv>(중복 선택 가능)</OverlapDiv>}
            </QuestionDiv>
            <ImageWrapper src="/images/bobdol.gif" alt="밥돌이 이미지" />
            <GraphDiv>
              <GraphBack>
                <Graph total={questionTotal} index={id}></Graph>
              </GraphBack>
              <SubDiv>
                {id}/{questionTotal}
              </SubDiv>
            </GraphDiv>
            {data.overlap ? (
              <SelectOverlap
                qusetionId={data.questionId}
                answerList={data.answerList}
                id={id}
              />
            ) : (
              <SelectOne
                qusetionId={data.questionId}
                answerList={data.answerList}
                id={id}
              />
            )}
          </>
        )}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div``;

const Wrapper = styled.div``;

const QuestionDiv = styled.div`
  float: left;
  width: 60%;
`;

const Title = styled.div`
  margin-top: 2vh;
  margin-left: 2vh;
  font-style: normal;
  font-size: 30px;
  font-weight: 800;
  word-break: keep-all;
`;

const OverlapDiv = styled.div`
  clear: both;
  margin-top: 1vh;
  margin-left: 2vh;
  font-style: normal;
  font-size: 15px;
  font-weight: 400;
  color: #797979;
`;

const ImageWrapper = styled.img`
  float: right;
  // width: 61px;
  height: 100px;
  margin-top: 1vh;
  margin-right: 2vh;
`;

const GraphDiv = styled.div`
  clear: both;
  padding: 2vh;
`;

const GraphBack = styled.div`
  height: 10px;
  border-radius: 10px;
  background-color: #faac69;
`;

export const Graph = styled.div<GraphProps>`
  position: relative;
  z-index=0;
  // top: -10px;
  width: ${(props) => {
    return (props.index / props.total) * 100;
  }}%;
  height: 10px;
  background-color: #FF7B30;
  border-radius: 10px;
`;

const SubDiv = styled.div`
  margin-top: 1vh;
  color: #b9b9b9;
  font-style: normal;
  font-size: 20px;
  font-weight: 800;
  text-align: right;
`;

const CopyrightImgWrapper = styled.div``;

const CopyrightImg = styled.img`
  top: 5%;
  // right: 4%;
  width: 32px;
  height: 32px;
  margin-top: 1.5vh;
  margin-left: 1vh;
  cursor: pointer;
  // float: right;

  @media (max-width: 991px) {
    top: 2%;
    right: 3%;
  }
  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
    margin-left: 3vh;
  }
`;

export default Question;
