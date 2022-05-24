import type { NextPage } from 'next';

import styled from '@emotion/styled';

import Header from '../components/common/header';
import CopyrightSection from '../components/copyrightSection';

import { useEffect } from 'react';

const Copyright: NextPage = () => {
  useEffect(() => {
    document.title = '밥추 | 저작권';
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header />
        <CopyrightSection />
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
  margin: 16px 0 0 16px;
`;

export default Copyright;
