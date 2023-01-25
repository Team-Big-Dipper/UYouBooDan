import React, { useState, useCallback } from "react";
import * as S from './style';

interface HotVoteArr {
  전체: JSX.Element;
  맛집추천: JSX.Element;
  생활: JSX.Element;
}

export const HotVote = () => {
  const [clicked, setClicked] = useState<string>('전체');

  const onClick = useCallback((e: any)=>{
    const text = e.target.innerText;
    setClicked(text);
  },[]);

  const HotVoteArr: any = {
    전체: (
      <S.CardAdd>
        <S.Crads>
          <S.Card>
            <div>
              <S.CardTitle>#맛집&nbsp;<span>D-day</span></S.CardTitle>
              <S.CardContent>
                오늘 점심은 뭘 먹을까요?
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#생활&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                어떤걸 사는게 좋을까요?
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#맛집&nbsp;<span>D-day</span></S.CardTitle>
              <S.CardContent>
                오늘 저녁은 뭘 먹을까요?
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
        </S.Crads>
        <S.AddContainer>
          <S.Add>+  더보기</S.Add>
        </S.AddContainer>
      </S.CardAdd>
    ),
    맛집추천: (
      <S.CardAdd>
        <S.Crads>
          <S.Card>
            <div>
              <S.CardTitle>#맛집&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#맛집&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#맛집&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
        </S.Crads>
        <S.AddContainer>
          <S.Add>+  더보기</S.Add>
        </S.AddContainer>
      </S.CardAdd>
    ),
    생활: (
      <S.CardAdd>
        <S.Crads>
          <S.Card>
            <div>
              <S.CardTitle>#생활&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#생활&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#생활&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
        </S.Crads>
        <S.AddContainer>
          <S.Add>+  더보기</S.Add>
        </S.AddContainer>
      </S.CardAdd>
    )
  }
  return (
    <S.HotVoteContainer>
      <S.Tabs>
        <S.Tab
          className={clicked === '전체' ? 'clicked' : ''}
          onClick={onClick}
          >전체</S.Tab>
        <S.Tab
          className={clicked === '맛집추천' ? 'clicked' : ''}
          onClick={onClick}
        >맛집추천</S.Tab>
        <S.Tab
          className={clicked === '생활' ? 'clicked' : ''}
          onClick={onClick}
        >생활</S.Tab>
      </S.Tabs>
      <S.HotVoteArrContainer>
        {HotVoteArr[clicked]}
      </S.HotVoteArrContainer>
    </S.HotVoteContainer>
  )
}