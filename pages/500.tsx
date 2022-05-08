import type { NextPage } from 'next';

import styled from '@emotion/styled';
import Header from '../components/common/header';

const Custom500: NextPage = () => {
  return (
    <Container>
      <Header />
      <h1>500 에러 페이지입니다</h1>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Custom500;
