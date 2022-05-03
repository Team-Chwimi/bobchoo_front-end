import type { NextPage } from 'next';
import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';

import styled from '@emotion/styled';
import { LatLngType } from '../types/Map';
import { latlngActions } from '../store/latlng';

const Survey: NextPage = () => {
  return (
    <Container>
      <Wrapper></Wrapper>
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

export default Survey;
