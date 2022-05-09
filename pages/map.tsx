import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/common/header';
import MapSection from '../components/map/mapSection';

const Map: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <Header />
        <MapSection />
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

export default Map;
