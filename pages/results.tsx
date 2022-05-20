import type { NextPage } from 'next';

import styled from '@emotion/styled';

import FoodListSection from '../components/result/foodListSection';

const Results: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <FoodListSection />
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

export default Results;
