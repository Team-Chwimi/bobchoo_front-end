import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    const meta = {
      title: '밥추',
      description: '당신을 위한 식사 메뉴 추천 서비스',
      image: '../images/logo.png',
    };

    return (
      <Html lang="ko">
        <Head>
          {/* <meta
            httpEquiv="refresh"
            content="0;url=http://www.bobchoo.site/"
          ></meta> */}
          <meta name="robots" content="follow, index" />
          <meta name="description" content={meta.description} />
          <meta property="og:site_name" content={meta.title} />
          <meta property="og:description" content={meta.description} />
          <meta property="og:title" content={meta.title} />
          <meta property="og:image" content={meta.image} />
          <script
            // src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_KEY}&libraries=places`}
            src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&region=ko&libraries=places`}
            async
            defer
          ></script>
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
