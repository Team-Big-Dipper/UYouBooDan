import { GlobalStyles } from '../styles/globalStyle';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';
import '../fonts/style.css';
// import initMockAPI from '../mocks';

//redux
import { store } from '../redux/store';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  // next.js 내장 -> 'pages' 폴더내부 파일들 불러옴

  // MSW 실행시켜주는 코드. 나중에 아래 코드만 주석처리하면 MSW 끄기 가능!
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    import('../mocks');
    // initMockAPI();
  }
  return (
    <>
      <Head>
        <title>우유부단</title>
      </Head>
      <Provider store={store}>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
}
