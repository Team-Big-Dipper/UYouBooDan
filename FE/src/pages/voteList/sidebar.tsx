import React from 'react';
import * as S from './style';

const Sidebar = () => {
  return (
    <div>
      <S.Sidebar>
        <p>홈 {'>'} 전체투표</p>
        <S.Pagename>전체투표</S.Pagename>
        <S.SidebarCategory>투표현황</S.SidebarCategory>
        <S.CategoryTitle>전체 투표</S.CategoryTitle>
        <S.CategoryTitle>베스트 투표</S.CategoryTitle>
        <S.CategoryTitle>진행중 투표</S.CategoryTitle>
        <S.CategoryTitle>종료된 투표</S.CategoryTitle>
        <S.CategoryTitle>마감임박순 투표</S.CategoryTitle>
        <S.SidebarCategory>카테고리</S.SidebarCategory>
        <S.CategoryTitle>맛집추천</S.CategoryTitle>
        <S.CategoryTitle>IT</S.CategoryTitle>
        <S.CategoryTitle>직장생활</S.CategoryTitle>
        <S.CategoryTitle>라이프스타일</S.CategoryTitle>
      </S.Sidebar>
    </div>
  );
};

export default Sidebar;
