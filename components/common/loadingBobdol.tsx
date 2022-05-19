import styled from '@emotion/styled';

import { PALETTE } from '../../data/palette';

const LoadingBobdol: React.FC = () => {
  return (
    <Wrapper>
      <ThinkingText>뭘 먹을지 생각중...</ThinkingText>
      <CircleDiv></CircleDiv>
      <BobdolImage
        src="/images/bobdol_carrot.gif"
        alt="나쵸 먹는 밥돌이 이미지"
      />
      <WaitText>기다려 주세요</WaitText>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${PALETTE.gray_38};
  font-size: 24px;
  font-weight: 700;
`;

const BobdolImage = styled.img`
  width: 102px;
  position: relative;

  &::after {
    position: absolute;
    background: ${PALETTE.orange};
    border-radius: 50%;
    width: 225px;
    height: 225px;
    z-index: -1;
  }
  
  transform: translate(0%, -150%);
`;

const ThinkingText = styled.div``;
const CircleDiv = styled.div`
background: #FAAC69;
width: 300px;
height: 300px;
border-radius: 300px;

`;

const WaitText = styled.div``;

export default LoadingBobdol;
