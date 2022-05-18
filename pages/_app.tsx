/* global kakao */
import React, { useEffect } from 'react';

import type { AppProps } from 'next/app';
import Head from 'next/head';

import '../styles/reset.css';
import '../styles/globals.css';

import { wrapper } from '../store';

import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const app = ({ Component, pageProps }: AppProps) => {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Head>
          <meta charSet="utf-8" />
          <link rel="icon" href="../images/bobdol_logo.png" />
          <title>밥추</title>
          <meta
            name="description"
            content="당신을 위한 식사 메뉴 추천 서비스"
          />
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
};

export default wrapper.withRedux(app);
