import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/common/header';
import TitleImg from '../components/result/titleImg';

import { LINK_HOME } from '../data/link';

type props = {
  id: number;
};
const Result: NextPage<props> = () => {
  return (
    <Container>
      <Wrapper>
        <Header linkName={LINK_HOME.linkName} linkPath={LINK_HOME.linkPath} />
        <TitleImg/>
      </Wrapper>
    </Container>
  );
};


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

export default Result;
