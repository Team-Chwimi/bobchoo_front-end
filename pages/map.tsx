import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import styled from '@emotion/styled';
import Header from '../components/common/header';

const Map: NextPage = () => {
  return (
    <Container>
      <Wrapper>
        <Header />
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

const Title = styled.h1``;

export default Map;
