import type { NextPage } from 'next';

import { useRouter } from 'next/router';

import styled from '@emotion/styled';
import { PALETTE } from '../data/palette';

interface ButtonProps {
  backgroundColor: string;
  fontColor: string;
}

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <Container>
      <Wrapper>
        <CopyrightButton onClick={() => router.push('/copyright')}>
          저작권
        </CopyrightButton>
        <TitleWrapper>
          <TitleImg src="/images/title_logo.png" alt="밥추 로고" />
          <TitleInfo>식사 메뉴 추천 서비스</TitleInfo>
        </TitleWrapper>
        <ButtonWrapper>
          <StartButton
            backgroundColor={PALETTE.gray_F2}
            fontColor={PALETTE.orange_point}
          >
            랜덤으로 선택
          </StartButton>
          <StartButton
            backgroundColor={PALETTE.orange_point}
            fontColor={PALETTE.white}
          >
            설문조사 시작
          </StartButton>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
  margin-top: 8%;

  @media (max-width: 991px) {
    margin-top: 10%;
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

const CopyrightButton = styled.button`
  position: absolute;
  top: 3%;
  right: 5%;
  cursor: pointer;

  @media (max-width: 767px) {
    top: 1%;
    right: 3%;
  }
`;

const TitleWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 28%;

  @media (max-width: 991px) {
    margin: 0 24%;
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
    margin: 0 16%;
  }
`;

const TitleImg = styled.img`
  width: 95%;

  @media (max-width: 991px) {
    width: 90%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 575px) {
  }
`;

const TitleInfo = styled.h2`
  margin: 2% 0 12%;
  color: ${PALETTE.gray_52};
  font-size: 30px;
  font-weight: 800;
  line-height: 1.7;
  text-shadow: 1px 1px 2px #a3a3a3;

  @media (max-width: 991px) {
    margin: 1% 0 6%;
    font-size: 24px;
  }
  @media (max-width: 767px) {
    margin: 1% 0 4%;
    font-size: 15px;
  }
  @media (max-width: 575px) {
  }
`;

const ButtonWrapper = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
  @media (max-width: 575px) {
  }
`;

const StartButton = styled.button<ButtonProps>`
  width: 300px;
  height: 120px;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.fontColor};
  font-size: 40px;
  font-weight: 800;
  font-family: 'NanumSquareRound';
  line-height: 23px;
  border: 0px;
  border-radius: 15px;
  transition: color 0.08s ease-in-out;
  cursor: pointer;

  &:first-child {
    margin-right: 32px;
  }

  @media (max-width: 991px) {
    width: 240px;
    height: 96px;
    font-size: 32px;
  }
  @media (max-width: 767px) {
    width: 233px;
    height: 55px;
    font-size: 22px;

    &:first-child {
      margin: 0 0 12px;
    }
  }
  @media (max-width: 575px) {
    width: 212px;
    height: 50px;
    font-size: 20px;

    &:first-child {
      margin: 0 0 11px;
    }
  }
`;

export default Home;
