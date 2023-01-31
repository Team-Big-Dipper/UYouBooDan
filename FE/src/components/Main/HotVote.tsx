import React, { useState, useCallback } from "react";
import * as style from './style';

interface HotVoteArr {
  전체: JSX.Element;
  맛집추천: JSX.Element;
  생활: JSX.Element;
}


export const HotVote = () => {
  const [clicked, setClicked] = useState<string>('전체');
  const category = ['전체', '일반', '음식', '쇼핑', '패션뷰티', '반려동물', '취미운동'];

  const onClick = useCallback((e: any)=>{
    const text = e.target.innerText;
    setClicked(text);
  },[]);

  const HotVoteArr: any = {
    전체: (
      <style.CardAdd>
        <style.Crads>
          <style.Card>
            <div>
              <style.CardTitle>#맛집&nbsp;<span>D-day</span></style.CardTitle>
              <style.CardContent>
                오늘 점심은 뭘 먹을까요?
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
          <style.Card>
            <div>
              <style.CardTitle>#생활&nbsp;<span>D-3</span></style.CardTitle>
              <style.CardContent>
                어떤걸 사는게 좋을까요?
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
          <style.Card>
            <div>
              <style.CardTitle>#맛집&nbsp;<span>D-day</span></style.CardTitle>
              <style.CardContent>
                오늘 저녁은 뭘 먹을까요?
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    음식: (
      <style.CardAdd>
        <style.Crads>
          <style.Card>
            <div>
              <style.CardTitle>#음식&nbsp;<span>D-3</span></style.CardTitle>
              <style.CardContent>
                Lorem ipsum dolor sit amet
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
          <style.Card>
            <div>
              <style.CardTitle>#음식&nbsp;<span>D-3</span></style.CardTitle>
              <style.CardContent>
                Lorem ipsum dolor sit amet
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
          <style.Card>
            <div>
              <style.CardTitle>#음식&nbsp;<span>D-3</span></style.CardTitle>
              <style.CardContent>
                Lorem ipsum dolor sit amet
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    일반: (
      <style.CardAdd>
        <style.Crads>
          <style.Card>
            <div>
              <style.CardTitle>#일반&nbsp;<span>D-3</span></style.CardTitle>
              <style.CardContent>
                Lorem ipsum dolor sit amet
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
          <style.Card>
            <div>
              <style.CardTitle>#일반&nbsp;<span>D-3</span></style.CardTitle>
              <style.CardContent>
                Lorem ipsum dolor sit amet
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
          <style.Card>
            <div>
              <style.CardTitle>#일반&nbsp;<span>D-3</span></style.CardTitle>
              <style.CardContent>
                Lorem ipsum dolor sit amet
              </style.CardContent>
            </div>
            <style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </style.AuthorDay>
          </style.Card>
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    )
  }
  return (
    <style.HotVoteContainer>
      <style.Tabs>
        {category.map((ele, idx)=>{
          return(<style.Tab
          key={idx}
          className={clicked === `${ele}` ? 'clicked' : ''}
          onClick={onClick}
          >{ele}</style.Tab>)
        })}
      </style.Tabs>
      <style.HotVoteArrContainer>
        {HotVoteArr[clicked]}
      </style.HotVoteArrContainer>
    </style.HotVoteContainer>
  )
}