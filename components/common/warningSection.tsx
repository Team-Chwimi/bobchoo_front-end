import styled from '@emotion/styled';

import Header from './header';

import { useSelector } from '../../store';

import { PALETTE } from '../../data/palette';

const WarningSection: React.FC = () => {
  const warningType = useSelector((state) => state.warningType.type);

  return (
    <Container>
      <Header />
      {warningType === 'badAnswer' ? (
        <>
          <BobdolImg src="/images/dog.gif" alt="강아지 화난 모습 이미지" />
          <ErrorMessage>잘못된 답변을 했습니다</ErrorMessage>
        </>
      ) : (
        <>
          <BobdolImg src="/images/bobdol_cry.gif" alt="밥돌이 우는 이미지" />
          <ErrorMessage>조건에 맞는 음식이 없습니다</ErrorMessage>
        </>
      )}
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2%;
`;

const BobdolImg = styled.img`
  width: 250px;
  margin: 4% 0 3%;

  @media (max-width: 767px) {
    margin: 3% 0 14%;
  }
`;

const ErrorMessage = styled.h1`
  font-size: 28px;
  font-weight: 800;
  font: ${PALETTE.gray_38};

  @media (max-width: 767px) {
    font-size: 24px;
  }
  @media (max-width: 575px) {
    font-size: 20px;
  }
`;

export default WarningSection;
