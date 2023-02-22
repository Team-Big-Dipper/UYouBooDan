import React, { useEffect, useState } from 'react';
import * as Style from './continueStyle';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Card } from './Card';
interface continueData {
  topicId: number;
  category: string;
  title: string;
  nickName: string;
  createdAt: string;
  closedAt: string;
}

export const ContinueVote = () => {
  const api = process.env.NEXT_PUBLIC_SERVER_URL;
  // console.log(api)
  const [datas, setDatas] = useState<continueData[]>([]);
  useEffect(() => {
    axios
      .get(`${api}/topics?size=6&page=1&filter=progress`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'ngrok-skip-browser-warning': 'any',
        }
      })
      .then((res: AxiosResponse) => {
        // console.log('요청 성공!', res);
        setDatas(res.data.data);
      })
      .catch((err: AxiosError) => {
        console.log('요청 실패!', err.message);
      });
  }, []);
  // console.log(datas)
  return (
    <Style.CarouselContainer>
      <Style.Cards>
        {datas?.map((data, idx) => {
          return (
            <Card
              key={idx}
              name={"continue"}
              idx={idx} 
              data={data}
            />
          );
        })}
      </Style.Cards>
    </Style.CarouselContainer>
  );
};
