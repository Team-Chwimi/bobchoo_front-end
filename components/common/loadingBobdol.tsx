import styled from '@emotion/styled';

import { PALETTE } from '../../data/palette';

const LoadingBobdol: React.FC = () => {
  return (
    <Wrapper>
      <ThinkingText>뭘 먹을지 생각중...</ThinkingText>
      <DivWrapper>
        <CircleDiv></CircleDiv>
        <BobdolImage
          src="/images/bobdol_carrot.gif"
          alt="나쵸 먹는 밥돌이 이미지"
        />
      </DivWrapper>
      <WaitText>기다려 주세요</WaitText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 24px;
  font-weight: 700;
  color: ${PALETTE.gray_38};
  margin-top: 5vh;
  text-aligh-center;
`;

const BobdolImage = styled.img`
  position: relative;
  width: 102px;
  transform: translate(0%, -150%);

  &::after {
    position: absolute;
    background: ${PALETTE.orange};
    border-radius: 50%;
    width: 225px;
    height: 225px;
    z-index: -1;
  }
`;

const ThinkingText = styled.div``;

const CircleDiv = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 300px;
  background: #faac69;
`;

const WaitText = styled.div``;

const DivWrapper = styled.div`
  margin-top: 10vh;
  text-align: center;
`;

export default LoadingBobdol;
