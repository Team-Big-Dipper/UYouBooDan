import { GlobalStyles } from '../styles/globalStyle';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';

export default function App({ Component, pageProps }: AppProps) {
  // next.js 내장 -> 'pages' 폴더내부 파일들 불러옴
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
    </Layout>
  );
}
