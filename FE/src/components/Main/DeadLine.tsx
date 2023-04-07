import React, { useEffect, useState } from "react";
import * as Style from './daedlineStyle';
import { DdayCal } from '../../utils/dDay';
import { FileNone } from '../../assets/fileNone';
import { getMain } from '../../apis/main/main';
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

  useEffect(()=>{
    getMain({size: 4, filter: 'imminent', setDatas: setDeadlineDatas})
  },[])
  // console.log(deadlineDatas)
  return(
    <Style.DeadLineTable>
      {deadlineDatas.length === 0 ?
        <Style.NoneContainer>
          <FileNone />
          <Style.NoneTitle>마감임박 투표가 없습니다.</Style.NoneTitle>
        </Style.NoneContainer>
        :
            <Style.DeadLineCards>
              <tbody>
                {deadlineDatas?.map((data,idx)=>{
                  return(
                    <Style.DeadLineCard key={idx}>
                    <td>
                      <div>
                        <Style.CardTitle>#{data.category}&nbsp;<span>D{DdayCal(data.closedAt)}</span></Style.CardTitle>
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
        }
          </Style.DeadLineTable>
  )
}