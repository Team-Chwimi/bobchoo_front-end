import type { NextPage } from 'next';
import { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/header';
import Question from '../components/survey/question';

const Random: NextPage = () => {
  useEffect(() => {
    document.title = '밥추 | 랜덤';
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header />
        <Question id={1} />
      </Wrapper>
    </Container>
  );
};

// Random.getInitialProps = async ({ query }: any) => {
//   const { id } = await query;
//   return { id };
// };

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
`;

export default Random;
