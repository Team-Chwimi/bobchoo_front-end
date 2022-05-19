import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/common/header';

import { LINK_HOME } from '../data/link';

const Custom404: NextPage = () => {
  return (
    <Container>
      <Header linkName={LINK_HOME.linkName} linkPath={LINK_HOME.linkPath} />
      <Wrapper>
        <Img src="/images/404_error.gif" alt="404 에러 이미지" />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 16px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15vh;
`;

const Img = styled.img`
  width: 60%;

  @media (max-width: 991px) {
    width: 85%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
`;

export default Custom404;
