import React from "react";
import { LoginNav } from "./loginNav";
import * as style from './style';
import { SearchSvg } from '../../assets/search';

interface HambugerNav {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu: React.FunctionComponent<HambugerNav> = ({ isOpen, setIsOpen }) => {
  return(
    <style.MenuContainer className={isOpen ? 'open' : ''}>
      <LoginNav />
      <style.MenuBottomContainer>
        <style.VoteConditionContainer>
          <div className="title">투표현황</div>
          <SearchSvg />
        </style.VoteConditionContainer>
        <style.Hr />
        <div className="subMenu">전체 투표</div>
        <div className="subMenu">베스트 투표</div>
        <div className="subMenu">진행중 투표</div>
        <div className="subMenu">종료된 투표</div>
        <div className="subMenu">마감임박순 투표</div>
        <style.VoteConditionContainer>
          <div className="title">
            카테고리
          </div>
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
  )
}