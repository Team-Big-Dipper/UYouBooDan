import { GlobalStyles } from '../styles/globalStyle';
import type { AppProps } from 'next/app';
import Layout from '../components/layout';
import Head from 'next/head';
import '../fonts/style.css';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/theme';

//redux
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  // MSW 실행시켜주는 코드. 나중에 아래 코드만 주석처리하면 MSW 끄기 가능!
  // if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  //   import('../mocks');
  // }

  // 아래 코드는 hydration 에러를 해결하기위한 해결책보다는 에러를 건너뛰는 방식
  // -> 좋은방법은 아닌것 같다.
  // const [showChild, setShowChild] = useState(false);

  // useEffect(() => {
  //   setShowChild(true);
  // }, []);

  // if (!showChild) {
  //   return null;
  // }
  // if (typeof window === 'undefined') {
  //   return <></>;
  // } else {
  return (
    <>
      <Head>
        <title>우유부단</title>
      </Head>
      <Provider store={store}>
        <Layout>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </Layout>
      </Provider>
    </>
  );
  // }
}
