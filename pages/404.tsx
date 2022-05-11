import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/common/header';

import { LINK_HOME } from '../data/link';

const Custom404: NextPage = () => {
  return (
    <Container>
      <Header linkName={LINK_HOME.linkName} linkPath={LINK_HOME.linkPath} />
      <h1>404 에러 페이지입니다</h1>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Custom404;
