import React from 'react';
import * as S from './style';

const ListPage = () => {
  return 
  <S.VoteList>
    <S.CategoryHeader>
    <div>
      <p>맛집추천</p>
      <p>맛집 추천에 관한 다양한 투표가 진행되고 있습니다.</p>
    </div>
    <button>나만의 투표 만들기</button>
    </S.CategoryHeader>
  </S.VoteList>
}

export default ListPage;