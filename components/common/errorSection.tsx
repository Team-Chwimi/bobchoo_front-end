import styled from '@emotion/styled';

import Header from './header';

import { PALETTE } from '../../data/palette';

interface ErrorSectionProps {
  errorMessage: string;
}

const ErrorSection: React.FC<ErrorSectionProps> = ({ errorMessage }) => {
  return (
    <Container>
      <Header />
      <BobdolImg src="/images/bobdol_fan.gif" alt="밥돌이 부채질 이미지" />
      <ErrorMessage>{errorMessage}</ErrorMessage>
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
  width: 300px;
  margin: 4% 0 6%;

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

export default ErrorSection;
