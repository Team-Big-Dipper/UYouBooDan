import { GlobalStyles } from '../styles/globalStyle';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';
import '../fonts/style.css';

export default function App({ Component, pageProps }: AppProps) {
  // next.js 내장 -> 'pages' 폴더내부 파일들 불러옴
  return (
    <>
      <Head>
        <title>우유부단</title>
      </Head>
      <Layout>
        <GlobalStyles />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
