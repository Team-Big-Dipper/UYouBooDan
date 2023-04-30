import { ContentImgDefaultSvg } from '../../../assets/contentImgDefault';
import { PageNationLeftSvg } from '../../../assets/pagenationLeft';
import { PageNationRightSvg } from '../../../assets/pagenationRight';
import * as S from './style';

const MyPageMain = ({ data }: any) => {
  console.log('MyPageMain -> data : ', data);
  return (
    <S.MyPageMainContainer>
      {data &&
        data.map((el: any) => {
          if (el.isClosed) {
            return (
              <S.ContentBoxDiv key={el.topicId}>
                <S.ContentBox>
                  <S.ContentTextBox>
                    <S.ContentCategory>#{el.category}</S.ContentCategory>
                    <S.ContentDetail>{el.title}</S.ContentDetail>
                    <S.ContentInfo>
                      <S.ContentDefaultImgDiv>
                        <ContentImgDefaultSvg />
                      </S.ContentDefaultImgDiv>
                      <S.ContentInfoNickDiv>{el.nickName}</S.ContentInfoNickDiv>
                      <S.ContentInfoLineDiv></S.ContentInfoLineDiv>
                      <S.ContentInfoCreatedDiv>
                        {el.createdAt.split(' ')[0].replace(/-/g, '.')}
                      </S.ContentInfoCreatedDiv>
                    </S.ContentInfo>
                  </S.ContentTextBox>
                  <S.ContentDdayEnd>종료</S.ContentDdayEnd>
                </S.ContentBox>
                <S.ContentRankingEnd>1위 김치찌개</S.ContentRankingEnd>
              </S.ContentBoxDiv>
            );
          }
          return (
            <S.ContentBoxDiv key={el.topicId}>
              <S.ContentBox>
                <S.ContentTextBox>
                  <S.ContentCategory>#{el.category}</S.ContentCategory>
                  <S.ContentDetail>{el.title}</S.ContentDetail>
                  <S.ContentInfo>
                    <S.ContentDefaultImgDiv>
                      <ContentImgDefaultSvg />
                    </S.ContentDefaultImgDiv>
                    <S.ContentInfoNickDiv>{el.nickName}</S.ContentInfoNickDiv>
                    <S.ContentInfoLineDiv></S.ContentInfoLineDiv>
                    <S.ContentInfoCreatedDiv>
                      {el.createdAt.split(' ')[0].replace(/-/g, '.')}
                    </S.ContentInfoCreatedDiv>
                  </S.ContentInfo>
                </S.ContentTextBox>
                <S.ContentDday>D - 3</S.ContentDday>
              </S.ContentBox>
              <S.ContentRanking>
                {el.createdAt.split(' ')[0].replace(/-/g, '.')} 까지
              </S.ContentRanking>
            </S.ContentBoxDiv>
          );
        })}
      {/* <S.ContentBoxDiv>
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
      </S.ContentBoxDiv> */}

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
          <S.ContentDdayDiv>
            <S.ContentDday>D - 3</S.ContentDday>
          </S.ContentDdayDiv>
        </S.ContentBox>
        <S.ContentRanking>1위 김치찌개</S.ContentRanking>
      </S.ContentBoxDiv>
      {/* {768} */}
      <S.PageNationDiv>
        <S.LeftDiv>
          <PageNationLeftSvg />
        </S.LeftDiv>
        <S.PageNationNumberDiv>
          <div>1</div>
          <div>2</div>
          <div>3</div>
        </S.PageNationNumberDiv>
        <S.RightDiv>
          <PageNationRightSvg />
        </S.RightDiv>
      </S.PageNationDiv>
    </S.MyPageMainContainer>
  );
};

export default MyPageMain;
