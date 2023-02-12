import React from 'react';
import * as S from './style';
import { conditions } from '../../constants/conditions';
import { useDispatch } from 'react-redux';
import { getVoteCondition } from '../../redux/slices/getVoteConditionSlice';

interface propTypes {
  condition: string;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Sidebar = ({ condition, setPage }: propTypes) => {
  const dispatch = useDispatch();
  const handleApiCondition = (e: any) => {
    dispatch(getVoteCondition({ mobileCondition: e.target.id }));
    setPage(1);
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
