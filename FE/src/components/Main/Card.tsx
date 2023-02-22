import React from "react";
import * as Style from './cardstyle';
import { DdayCal } from '../../utils/dDay';
import { useRouter } from 'next/router';

interface proptypes {
  idx: number;
  data: any;
  name: string;
}
export const Card = ({idx, data, name}: proptypes) => {
  const router = useRouter();
  const handleCardClick = () => {
    router.push(`/readvote?pid=${data.topicId}`)
  }
  return(
    <>
      <Style.Card key={idx} onClick={handleCardClick} className={name === 'hot' ? 'hot' : 'continue'}>
        <div>
          <Style.CardTitle>
            #{data.category}&nbsp;<span>D-{DdayCal(data.closedAt)}</span>
          </Style.CardTitle>
          <Style.CardContent>{data.title}</Style.CardContent>
        </div>
        <Style.AuthorDay>
          {data.nickName}
          <Style.Date>
            {data.closedAt.slice(0, 4)}.{data.closedAt.slice(5, 7)}.
            {data.closedAt.slice(8, 10)}
          </Style.Date>
        </Style.AuthorDay>
      </Style.Card>
    </>
  )
}