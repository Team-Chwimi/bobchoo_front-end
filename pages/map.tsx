import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

import styled from '@emotion/styled';

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMapSection = dynamic(
  () => import('../components/map/kakaoMapSection'),
  {
    ssr: false,
  },
);

const Map: NextPage = () => {
  useEffect(() => {
    document.title = '밥추 | 지도';
  }, []);

  return (
    <Container>
      <Wrapper>
        <KakaoMapSection />
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
`;

export default Map;
