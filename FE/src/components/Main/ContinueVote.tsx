import React, { useEffect, useState } from "react";
import * as Style from './continueStyle';
import axios, { AxiosResponse, AxiosError } from 'axios';

interface continueData {
  category: string;
  title: string;
  author: string;
  closedAt: string;
}

export const ContinueVote = () => {
  const [datas, setDatas] = useState<continueData[]>();
  useEffect(()=>{
    axios
      .get('/api/main/continue')
      .then((res: AxiosResponse) => {
        console.log('요청 성공!', res);
        setDatas(res.data[0].topics);
      })
      .catch((err: AxiosError) => {
        console.log('요청 실패!', err.message);
      });
  },[])
  console.log(datas)
  datas?.map((data,idx) => console.log(data,idx))
  return(
    <Style.CarouselContainer>
        <Style.Cards>
          {datas?.map((data,idx)=>{
            const today = new Date().toISOString;
            const deadLine = data.closedAt;
            return(
            <Style.Card>
            <div>
              <Style.CardTitle>#{data.category}&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                {data.title}
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              {data.author}
              <Style.Date>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</Style.Date>
            </Style.AuthorDay>
          </Style.Card>
          )})}
        </Style.Cards>
      </Style.CarouselContainer>
  )
}