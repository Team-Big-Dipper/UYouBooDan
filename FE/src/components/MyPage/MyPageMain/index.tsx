import { ContentImgDefaultSvg } from '../../../assets/contentImgDefault';
import { PageNationLeftSvg } from '../../../assets/pagenationLeft';
import { PageNationRightSvg } from '../../../assets/pagenationRight';
import * as S from './style';

const MyPageMain = () => {
  return (
    <S.MyPageMainContainer>
      <S.ContentBoxDiv>
        <S.ContentBox>
          <S.ContentTextBox>
            <S.ContentCategory>#카테고리</S.ContentCategory>
            <S.ContentDetail>
              보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러 인간엇이 내려온엇이
              내려온엇이 내? 보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러
              인간엇이 내려온엇이 내려온엇이 내? 보는 놀이 것이 바이며, 힘차게
              가는 쓸히 불러 인간엇이 내려온엇이 내려온엇이 내?
            </S.ContentDetail>
            <S.ContentInfo>
              <S.ContentDefaultImgDiv>
                <ContentImgDefaultSvg />
              </S.ContentDefaultImgDiv>
              <S.ContentInfoNickDiv>DASONG</S.ContentInfoNickDiv>
              <S.ContentInfoLineDiv></S.ContentInfoLineDiv>
              <S.ContentInfoCreatedDiv>2023.01.06</S.ContentInfoCreatedDiv>
            </S.ContentInfo>
          </S.ContentTextBox>
          <S.ContentDday>D - 3</S.ContentDday>
        </S.ContentBox>
        <S.ContentRanking>1위 김치찌개</S.ContentRanking>
      </S.ContentBoxDiv>

      <S.ContentBoxDiv>
        <S.ContentBox>
          <S.ContentTextBox>
            <S.ContentCategory>#카테고리</S.ContentCategory>
            <S.ContentDetail>
              보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러 인간엇이 내려온엇이
              내려온엇이 내? 보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러
              인간엇이 내려온엇이 내려온엇이 내? 보는 놀이 것이 바이며, 힘차게
              가는 쓸히 불러 인간엇이 내려온엇이 내려온엇이 내?
            </S.ContentDetail>
            <S.ContentInfo>
              <S.ContentDefaultImgDiv>
                <ContentImgDefaultSvg />
              </S.ContentDefaultImgDiv>
              <S.ContentInfoNickDiv>DASONG</S.ContentInfoNickDiv>
              <S.ContentInfoLineDiv></S.ContentInfoLineDiv>
              <S.ContentInfoCreatedDiv>2023.01.06</S.ContentInfoCreatedDiv>
            </S.ContentInfo>
          </S.ContentTextBox>
          <S.ContentDdayEnd>종료</S.ContentDdayEnd>
        </S.ContentBox>
        <S.ContentRankingEnd>1위 김치찌개</S.ContentRankingEnd>
      </S.ContentBoxDiv>

      <S.ContentBoxDiv>
        <S.ContentBox>
          <S.ContentTextBox>
            <S.ContentCategory>#카테고리</S.ContentCategory>
            <S.ContentDetail>
              보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러 인간엇이 내려온엇이
              내려온엇이 내? 보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러
              인간엇이 내려온엇이 내려온엇이 내? 보는 놀이 것이 바이며, 힘차게
              가는 쓸히 불러 인간엇이 내려온엇이 내려온엇이 내?
            </S.ContentDetail>
            <S.ContentInfo>
              <S.ContentDefaultImgDiv>
                <ContentImgDefaultSvg />
              </S.ContentDefaultImgDiv>
              <S.ContentInfoNickDiv>DASONG</S.ContentInfoNickDiv>
              <S.ContentInfoLineDiv></S.ContentInfoLineDiv>
              <S.ContentInfoCreatedDiv>2023.01.06</S.ContentInfoCreatedDiv>
            </S.ContentInfo>
          </S.ContentTextBox>
          <S.ContentDdayEnd>종료</S.ContentDdayEnd>
        </S.ContentBox>
        <S.ContentRankingEnd>1위 김치찌개</S.ContentRankingEnd>
      </S.ContentBoxDiv>

      <S.ContentBoxDiv>
        <S.ContentBox>
          <S.ContentTextBox>
            <S.ContentCategory>#카테고리</S.ContentCategory>
            <S.ContentDetail>
              보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러 인간엇이 내려온엇이
              내려온엇이 내? 보는 놀이 것이 바이며, 힘차게 가는 쓸히 불러
              인간엇이 내려온엇이 내려온엇이 내? 보는 놀이 것이 바이며, 힘차게
              가는 쓸히 불러 인간엇이 내려온엇이 내려온엇이 내?
            </S.ContentDetail>
            <S.ContentInfo>
              <S.ContentDefaultImgDiv>
                <ContentImgDefaultSvg />
              </S.ContentDefaultImgDiv>
              <S.ContentInfoNickDiv>DASONG</S.ContentInfoNickDiv>
              <S.ContentInfoLineDiv></S.ContentInfoLineDiv>
              <S.ContentInfoCreatedDiv>2023.01.06</S.ContentInfoCreatedDiv>
            </S.ContentInfo>
          </S.ContentTextBox>
          <S.ContentDday>D - 3</S.ContentDday>
        </S.ContentBox>
        <S.ContentRanking>1위 김치찌개</S.ContentRanking>
      </S.ContentBoxDiv>

      <S.PageNationDiv>
        <div>
          <PageNationLeftSvg />
        </div>
        <S.PageNationNumberDiv>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </S.PageNationNumberDiv>
        <div>
          <PageNationRightSvg />
        </div>
      </S.PageNationDiv>
    </S.MyPageMainContainer>
  );
};

export default MyPageMain;
