import React from 'react';
import Header from './Header';
import Footer from './Footer';
import * as S from './style';

type AppLayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <S.LayoutContainer>
      <Header />
      {children}
      <Footer />
    </S.LayoutContainer>
  );
};

export default Layout;
