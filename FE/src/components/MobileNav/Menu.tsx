import React from 'react';
import * as style from './style';
import { SearchSvg } from '../../assets/search';
import { LogInAfterNav } from './loginAfterNav';
import { LoginNav } from './loginNav';
import { useDispatch } from 'react-redux';
import { getVoteCondition } from '../../redux/slices/getVoteConditionSlice';
import { useRouter } from 'next/router';
interface HambugerNav {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FunctionComponent<HambugerNav> = ({
  isOpen,
  setIsOpen,
}) => {
  // const accessLocal = localStorage.getItem('Authorization')
  // const accessSession = sessionStorage.getItem('Authorization')
  const router = useRouter();
  const dispatch = useDispatch();
  const HandleGetVoteCondition = (e: any) => {
    dispatch(getVoteCondition({ mobileCondition: e.target.id }));
    setIsOpen(false);
    router.push({ pathname: '/voteList', query: { conditions: e.target.id } });
  };
  return (
    <style.MenuContainer className={isOpen ? 'open' : ''}>
      {/* {(accessLocal || accessSession) ? <LogInAfterNav /> : <LoginNav />} */}
      <LoginNav />
      <style.MenuBottomContainer>
        <style.VoteConditionContainer>
          <div className="title">투표현황</div>
          <SearchSvg />
        </style.VoteConditionContainer>
        <style.Hr />
        <div id="all" className="subMenu" onClick={HandleGetVoteCondition}>
          전체 투표
        </div>
        <div id="hot" className="subMenu" onClick={HandleGetVoteCondition}>
          베스트 투표
        </div>
        <div id="progress" className="subMenu" onClick={HandleGetVoteCondition}>
          진행중 투표
        </div>
        <div id="closed" className="subMenu" onClick={HandleGetVoteCondition}>
          종료된 투표
        </div>
        <div id="imminent" className="subMenu" onClick={HandleGetVoteCondition}>
          마감임박순 투표
        </div>
        <style.VoteConditionContainer>
          <div className="title">카테고리</div>
        </style.VoteConditionContainer>
        <style.Hr />
        <div className="subMenu">일반</div>
        <div className="subMenu">음식</div>
        <div className="subMenu">쇼핑</div>
        <div className="subMenu">패션뷰티</div>
        <div className="subMenu">반려동물</div>
        <div className="subMenu">취미운동</div>
      </style.MenuBottomContainer>
    </style.MenuContainer>
  );
};
