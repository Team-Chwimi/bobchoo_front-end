import type { NextPage } from 'next';

import styled from '@emotion/styled';

import MapSection from '../components/map/mapSection';

const Map: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <MapSection />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section``;

const Wrapper = styled.div`
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 100%;

  @media (max-width: 991px) {
  }
  @media (max-width: 767px) {
  }
  @media (max-width: 575px) {
  }
`;

export default Map;
