import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body>
          <script
            defer
            src={process.env.ANALYTICS_SRC}
            data-website-id={process.env.ANALYTICS_WEBSITE_ID}
          ></script>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;