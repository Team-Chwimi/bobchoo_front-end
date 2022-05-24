import styled from '@emotion/styled';

import Header from './header';

import { PALETTE } from '../../data/palette';

interface TitleHeaderProps {
  title: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <Container>
      <LinkWrapper>
        <Header />
      </LinkWrapper>
      <HeaderWrapper>
        <Title>{title}</Title>
        <ImageWrapper src="/images/bobdol_carrot.gif" alt="밥돌이 이미지" />
      </HeaderWrapper>
    </Container>
  );
};

const Container = styled.div`
  // display: flex;
  // flex-direction: column;
`;

const LinkWrapper = styled.div`
  // position: absolute;
  // margin-top: 16px;
  // padding-left: 8px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 16px 32px 8px 24px;
  justify-content: space-between;
`;

const Title = styled.div`
  color: ${PALETTE.gray_38};
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  margin-top: 5vh;
  word-break: keep-all;
  float: left;
`;

const ImageWrapper = styled.img`
  // width: 61px;
  height: 10vh;
  float: right;
  margin-right: 2vh;
`;

export default TitleHeader;
