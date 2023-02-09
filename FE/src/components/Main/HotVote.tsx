import React, { useState, useCallback, useEffect } from "react";
import * as style from './style';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { DdayCal } from '../../utils/dDay';

// console.log(DdayCal(mockDeadLineList.data[0].closedAt));
// console.log('dDay :', DdayCal('2023-03-02 22:30:00'))
interface hotData {
  topicId: number,
  category: string;
  title: string;
  nickName: string;
  createdAt: string,
  closedAt: string;
}
export const HotVote = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  const [clicked, setClicked] = useState<string>('전체');
  const category = ['전체', '일반', '음식', '쇼핑', '패션뷰티', '반려동물', '취미운동'];

  const onClick = useCallback((e: any)=>{
    const text = e.target.innerText;
    setClicked(text);
  },[]);

  const [hotDatas, setHotDatas] = useState<hotData[]>([]);

  useEffect(()=>{
    axios
      .get('/api/hot')
      .then((res: AxiosResponse) => {
        console.log('hotList :', res.data.data);
        setHotDatas(res.data.data);
      })
      .catch((err: AxiosError) => {
        console.log('요청 실패!', err.message);
      });
  },[])
  const HotVoteArr: any = {
    전체: (
      <style.CardAdd>
        <style.Crads>
          {hotDatas?.filter((data,idx) => idx < 3).map((data,idx)=>{
            return(
              <style.Card key={idx}>
                <div>
                  <style.CardTitle>#음식&nbsp;<span>D-{DdayCal(data.closedAt)}</span></style.CardTitle>
                  <style.CardContent>
                    {data.title}
                  </style.CardContent>
                </div>
                <style.AuthorDay>
                  {data.nickName}
                  <span>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</span>
                </style.AuthorDay>
              </style.Card>
            )
          })}
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    음식: (
      <style.CardAdd>
        <style.Crads>
          {hotDatas?.filter(data =>data.category === '음식').map((data,idx)=>{
            return(
              <style.Card key={idx}>
                <div>
                  <style.CardTitle>#음식&nbsp;<span>D-{DdayCal(data.closedAt)}</span></style.CardTitle>
                  <style.CardContent>
                    {data.title}
                  </style.CardContent>
                </div>
                <style.AuthorDay>
                  {data.nickName}
                  <span>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</span>
                </style.AuthorDay>
              </style.Card>
            )
          })}
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    일반: (
      <style.CardAdd>
        <style.Crads>
          {hotDatas?.filter(data =>data.category === '일반').map((data,idx)=>{
            return(
              <style.Card key={idx}>
                <div>
                  <style.CardTitle>#일반&nbsp;<span>D-{DdayCal(data.closedAt)}</span></style.CardTitle>
                  <style.CardContent>
                    {data.title}
                  </style.CardContent>
                </div>
                <style.AuthorDay>
                  {data.nickName}
                  <span>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</span>
                </style.AuthorDay>
              </style.Card>
            )
          })}
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    쇼핑: (
      <style.CardAdd>
        <style.Crads>
          {hotDatas?.filter(data =>data.category === '쇼핑').map((data,idx)=>{
            return(
              <style.Card key={idx}>
                <div>
                  <style.CardTitle>#쇼핑&nbsp;<span>D-{DdayCal(data.closedAt)}</span></style.CardTitle>
                  <style.CardContent>
                    {data.title}
                  </style.CardContent>
                </div>
                <style.AuthorDay>
                  {data.nickName}
                  <span>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</span>
                </style.AuthorDay>
              </style.Card>
            )
          })}
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    패션뷰티: (
      <style.CardAdd>
        <style.Crads>
          {hotDatas?.filter(data =>data.category === '패션뷰티').map((data,idx)=>{
            return(
              <style.Card key={idx}>
                <div>
                  <style.CardTitle>#패션뷰티&nbsp;<span>D-{DdayCal(data.closedAt)}</span></style.CardTitle>
                  <style.CardContent>
                    {data.title}
                  </style.CardContent>
                </div>
                <style.AuthorDay>
                  {data.nickName}
                  <span>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</span>
                </style.AuthorDay>
              </style.Card>
            )
          })}
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    반려동물: (
      <style.CardAdd>
        <style.Crads>
          {hotDatas?.filter(data =>data.category === '반려동물').map((data,idx)=>{
            return(
              <style.Card key={idx}>
                <div>
                  <style.CardTitle>#반려동물&nbsp;<span>D-{DdayCal(data.closedAt)}</span></style.CardTitle>
                  <style.CardContent>
                    {data.title}
                  </style.CardContent>
                </div>
                <style.AuthorDay>
                  {data.nickName}
                  <span>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</span>
                </style.AuthorDay>
              </style.Card>
            )
          })}
        </style.Crads>
        <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer>
      </style.CardAdd>
    ),
    취미운동: (
      <style.CardAdd>
        <style.Crads>
          {hotDatas?.filter(data =>data.category === '취미운동').map((data,idx)=>{
            return(
              <style.Card key={idx}>
                <div>
                  <style.CardTitle>#취미운동&nbsp;<span>D-{DdayCal(data.closedAt)}</span></style.CardTitle>
                  <style.CardContent>
                    {data.title}
                  </style.CardContent>
                </div>
                <style.AuthorDay>
                  {data.nickName}
                  <span>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</span>
                </style.AuthorDay>
              </style.Card>
            )
          })}
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