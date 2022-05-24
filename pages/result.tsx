import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/common/header';
import TitleImg from '../components/result/titleImg';

const Result: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <Header />
        <TitleImg />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
`;

export default Result;
