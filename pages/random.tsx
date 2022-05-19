import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/common/header';
import Question from '../components/survey/question';

import { LINK_HOME } from '../data/link';

type props = {
  id: number;
};
const Random: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <Header linkName={LINK_HOME.linkName} linkPath={LINK_HOME.linkPath} />
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

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;
// const Question = styled.div`<{qestionId:string}>`;

const Title = styled.h1``;

export default Random;
