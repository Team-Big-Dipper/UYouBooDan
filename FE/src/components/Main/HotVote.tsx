import React, { useState, useCallback, useEffect } from "react";
import * as style from './style';
import { getMain } from '../../apis/main/main';
import { HotVoteArr } from './HotVoteArr';
interface hotData {
  topicId: number,
  category: string;
  title: string;
  nickName: string;
  createdAt: string,
  closedAt: string;
}
export const HotVote = () => {
  const [clicked, setClicked] = useState<string>('전체');
  const category : string[] = ['전체', '일반', '음식', '쇼핑', '패션뷰티', '반려동물', '취미운동'];

  const onClick = useCallback((e: any)=>{
    const text = e.target.innerText;
    setClicked(text);
  },[]);

  const [hotDatas, setHotDatas] = useState<hotData[]>([]);

  useEffect(()=>{
    getMain({size: 10, filter: 'hot', setDatas: setHotDatas})
  },[])

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
        {HotVoteArr(category, hotDatas)[clicked]}
      </style.HotVoteArrContainer>
    </style.HotVoteContainer>
  )
}