import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../../components/common/header';
import Question from '../../components/survey/question';

type props = {
  id: number;
};

const SurveyDetail: NextPage<props> = ({ id }) => {
  return (
    <Container>
      <Wrapper>
        <Header />
        <Question id={id} />
      </Wrapper>
    </Container>
  );
};

SurveyDetail.getInitialProps = async ({ query }: any) => {
  const { id } = await query;
  return { id };
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
`;

export default SurveyDetail;
