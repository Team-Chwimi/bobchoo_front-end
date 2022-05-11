import styled from '@emotion/styled';

import Header from './header';

interface TitleHeaderProps {
  title: string;
}

const TitleHeader: React.FC<TitleHeaderProps> = ({ title }) => {
  return (
    <Container>
      <LinkWrapper>
        <Header linkName="뒤로가기" linkPath="/" />
      </LinkWrapper>
      <HeaderWrapper>
        <Title>{title} 가게 목록</Title>
        <ImageWrapper src="/images/bobdol_carrot.gif" alt="밥돌이 이미지" />
      </HeaderWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const LinkWrapper = styled.div`
  position: absolute;
  margin-top: 16px;
  padding-left: 8px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin: 16px 32px 8px 24px;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 800;
`;

const ImageWrapper = styled.img`
  // width: 61px;
  height: 61px;
`;

export default TitleHeader;
