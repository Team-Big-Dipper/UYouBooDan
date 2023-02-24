import * as React from "react";
import * as S from './style';

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <S.TabButton
    className={`${isActive ? "isActive" : ""}`}
    onClick={onClick}
  >
    {children}
  </S.TabButton>
);