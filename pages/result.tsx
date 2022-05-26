import type { NextPage } from 'next';
import { useEffect } from 'react';

import styled from '@emotion/styled';

import Header from '../components/common/header';
// import TitleImg from '../components/result/titleImg';
import dynamic from 'next/dynamic';

declare global {
  interface Window {
    Kakao: any;
  }
}

const TitleImg = dynamic(() => import('../components/result/titleImg'), {
  // Do not import in server side
  ssr: false,
});

const Result: NextPage = () => {
  useEffect(() => {
    document.title = '밥추 | 결과';
  }, []);

  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Header />
        <TitleImg />
      </Wrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center; ;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 900px;
`;

export default Result;
