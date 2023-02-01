import * as S from './style';
import { NoCheckSvg } from '../../../assets/noCheck';
import { OnCheckSvg } from '../../../assets/onCheck';
import { useState } from 'react';
import MyPageMain from '../MyPageMain';

const MyPageHeader = ({ category }: any) => {
  const [all, setAll] = useState<boolean>(true);
  const [ing, setIng] = useState<boolean>(false);
  const [end, setEnd] = useState<boolean>(false);
  console.log('category : ', category);
  return (
    <S.MypageHeaderContainer>
      <S.HeaderTitleDiv>{category}</S.HeaderTitleDiv>
      <S.RadioContainer>
        <S.RadioListDiv
          onClick={() => {
            setAll(true);
            setIng(false);
            setEnd(false);
          }}
        >
          <div>{all ? <OnCheckSvg /> : <NoCheckSvg />}</div>
          <div>전체</div>
        </S.RadioListDiv>
        <S.RadioListDiv
          onClick={() => {
            setAll(false);
            setIng(true);
            setEnd(false);
          }}
        >
          <div>{ing ? <OnCheckSvg /> : <NoCheckSvg />}</div>
          <div>진행중인 투표</div>
        </S.RadioListDiv>
        <S.RadioListDiv
          onClick={() => {
            setAll(false);
            setIng(false);
            setEnd(true);
          }}
        >
          <div>{end ? <OnCheckSvg /> : <NoCheckSvg />}</div>
          <div>종료된 투표</div>
        </S.RadioListDiv>
      </S.RadioContainer>
      <MyPageMain />
    </S.MypageHeaderContainer>
  );
};

export default MyPageHeader;
