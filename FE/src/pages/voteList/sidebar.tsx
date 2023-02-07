import React from 'react';
import * as S from './style';
import { conditions } from '../../constants/conditions';
import Link from 'next/link';

interface propTypes {
  condition: string;
  setCondition: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ condition, setCondition }: propTypes) => {
  const handleApiCondition = (e: any) => {
    console.log(e.target.id);
    setCondition(e.target.id);
  };
  return (
    <div>
      <S.Sidebar>
        <p>
          <S.SidebarLink href="/main">홈</S.SidebarLink> {' > '}{' '}
          {conditions[condition]}
        </p>
        <S.Pagename>{conditions[condition]}</S.Pagename>
        <S.SidebarCategory>투표현황</S.SidebarCategory>
        <S.CategoryTitle id="all" onClick={handleApiCondition}>
          전체 투표
        </S.CategoryTitle>
        <S.CategoryTitle id="progress" onClick={handleApiCondition}>
          진행중 투표
        </S.CategoryTitle>
        <S.CategoryTitle id="closed" onClick={handleApiCondition}>
          종료된 투표
        </S.CategoryTitle>
        <S.CategoryTitle id="imminent" onClick={handleApiCondition}>
          마감임박순 투표
        </S.CategoryTitle>
      </S.Sidebar>
    </div>
  );
};

export default Sidebar;
