import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Script
        strategy="lazyOnload"
        src={process.env.ANALYTICS_SRC}
        data-website-id={process.env.ANALYTICS_WEBSITE_ID}
      />
      <Component {...pageProps} />
    </>
  );
}