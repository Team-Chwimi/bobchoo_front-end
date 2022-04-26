import '../styles/reset.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="../images/bobdol_logo.png" />
        <title>밥추</title>
        <meta name="description" content="당신을 위한 식사 메뉴 추천 서비스" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
