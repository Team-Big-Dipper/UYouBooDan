import React, {useState, useEffect, Suspense} from 'react';
import * as S from './style';
import { Fingerprint } from '../../assets/fingerprint';
import { ContinueVote } from '../../components/Main/ContinueVote'
import { HotVote } from '../../components/Main/HotVote';
import { DeadLine } from '../../components/Main/DeadLine';

function Main() {
  return(
  <S.MainContainer>
    <S.MakeVoteContainer>
      <S.MakeVoteContent>
        <div>이젠 혼자</div>
        <div>고민하지 마세요.</div>
        <div>우유부단이 함께합니다.</div>
        <S.CreateVoteBtn href="/createvote"><Fingerprint />&nbsp;&nbsp;나만의 투표 만들기</S.CreateVoteBtn>
      </S.MakeVoteContent>
    </S.MakeVoteContainer>
    {/* 진행중인 투표 */}
    <S.ContinueVoteContainer>
      <S.ContinueTitle>
        <h2>진행중인 투표에 <br />참여해보세요.</h2>
        <S.ContinueMore href="/topics?size=6&page=1&filter=progress">더보기 &gt;</S.ContinueMore>
      </S.ContinueTitle>
      <ContinueVote />
    </S.ContinueVoteContainer>
    {/* 핫한 투표 */}
    <S.HotContainer>
      <S.HotTitle><span>핫한</span>&nbsp;투표를 만나보세요!</S.HotTitle>
      <HotVote />
    </S.HotContainer>
    {/* 마감임박 투표 */}
    <S.ImageDeadLineContainer>
      <S.ImageContainer></S.ImageContainer>
      <S.MobileDiv>
        <S.MainDeadMobileStyled />
      </S.MobileDiv>
      <S.DeadLineContainer>
        <S.DeadLineTitle>
          <div className='title'>마감임박 투표</div>
          <S.deadMore href="/topics?size=6&page=1&filter=imminent">더보기 &gt;</S.deadMore>
        </S.DeadLineTitle>
        <DeadLine />
      </S.DeadLineContainer>
    </S.ImageDeadLineContainer>
  </S.MainContainer>
  );
}

export default Main;
