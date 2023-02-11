import React from 'react';
import * as S from './style';
import { conditions } from '../../constants/conditions';

interface propTypes {
  condition: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setCondition: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar = ({ condition, setPage, setCondition }: propTypes) => {
  const handleApiCondition = (e: any) => {
    setPage(1);
    setCondition(e.target.id);
  };
  return (
    <div>
      <S.Sidebar>
        <S.CurrentCategoty>
          <S.SidebarLink href="/main">홈</S.SidebarLink> {' > '}{' '}
          {condition === null ? conditions['all'] : conditions[condition]}
        </S.CurrentCategoty>
        <S.Pagename>
          {condition === null ? conditions['all'] : conditions[condition]}
        </S.Pagename>
        <S.SidebarCategory>투표현황</S.SidebarCategory>
        <S.CategoryTitle id="all" onClick={handleApiCondition}>
          전체 투표
        </S.CategoryTitle>
        <S.CategoryTitle id="hot" onClick={handleApiCondition}>
          베스트 투표
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
