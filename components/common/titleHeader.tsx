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

const Container = styled.div``;

const LinkWrapper = styled.div``;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin: 16px 32px 8px 24px;
`;

const Title = styled.div`
  float: left;
  margin-top: 5vh;
  color: ${PALETTE.gray_38};
  font-size: 40px;
  font-style: normal;
  font-weight: 800;
  word-break: keep-all;
`;

const ImageWrapper = styled.img`
  float: right;
  height: 10vh;
  margin-right: 2vh;
`;

export default TitleHeader;
