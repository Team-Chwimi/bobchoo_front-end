import type { NextPage } from 'next';

import styled from '@emotion/styled';

import FoodListSection from '../components/vote/foodListSection';

const List: NextPage = () => {
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
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // width: 100%;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

export default List;
