import Document, { Html, Head, Main, NextScript } from 'next/document';

const META_DATA = {
  title: '밥추',
  description: '당신을 위한 식사 메뉴 추천 서비스',
  author: 'Team-Chwimi',
  image: '../images/logo.png',
};

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <meta name="robots" content="follow, index" />
          <meta name="description" content={META_DATA.description} />
          <meta name="keyword" content={META_DATA.title} />
          <meta name="author" content={META_DATA.author} />
          <meta property="og:site_name" content={META_DATA.title} />
          <meta property="og:description" content={META_DATA.description} />
          <meta property="og:title" content={META_DATA.title} />
          <meta property="og:image" content={META_DATA.image} />
          <script
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&region=ko&libraries=places&autoload=false`}
            async
            defer
          ></script>
          <script
            type="text/javascript"
            src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_APPKEY}&libraries=services`}
          ></script>
          <script src="//developers.kakao.com/sdk/js/kakao.min.js"></script>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          ></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
          {/* <script
            // type="text/javascript"
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}`}
            // src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&callback=initMap`}
            async
            defer
          ></script> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
