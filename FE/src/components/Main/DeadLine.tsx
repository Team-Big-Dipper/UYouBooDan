import React, { useEffect, useState } from "react";
import * as Style from './daedlineStyle';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { DdayCal } from '../../utils/dDay';
import { mockDeadLineList } from '../../mocks/data/deadLineList';
interface deadLineData {
  topicId: number,
  category: string;
  title: string;
  nickName: string;
  createdAt: string,
  closedAt: string;
}

export const DeadLine = () => {

  const [deadlineDatas, setDeadlineDatas] = useState<deadLineData[]>([]);
  ///api/topics?size=4&page=1&filter=imminent
  useEffect(()=>{
    axios
      .get('/api/imminent')
      .then((res: AxiosResponse) => {
        console.log('deadLineList :', res.data.data);
        setDeadlineDatas(res.data.data);
      })
      .catch((err: AxiosError) => {
        console.log('요청 실패!', err.message);
      });
  },[])
  return(
    <Style.DeadLineTable>
            <Style.DeadLineCards>
              <tbody>
                {deadlineDatas?.map((data,idx)=>{
                  return(
                    <Style.DeadLineCard key={idx}>
                    <td>
                      <div>
                        <Style.CardTitle>#{data.category}&nbsp;<span>D-{DdayCal(data.closedAt)}</span></Style.CardTitle>
                        <Style.CardContent>
                          {data.title}
                        </Style.CardContent>
                      </div>
                      <Style.AuthorDay>
                        {data.nickName}
                        <Style.Date>{data.closedAt.slice(0,4)}.{data.closedAt.slice(5,7)}.{data.closedAt.slice(8,10)}</Style.Date>
                      </Style.AuthorDay>
                    </td>
                  </Style.DeadLineCard>
                  )
                })}
              </tbody>
            </Style.DeadLineCards>
          </Style.DeadLineTable>
  )
}