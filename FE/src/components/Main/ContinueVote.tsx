import React, { useEffect, useState } from 'react';
import * as Style from './continueStyle';
import { Card } from './Card';
import { getMain } from '../../apis/main/main';
interface continueData {
  topicId: number;
  category: string;
  title: string;
  nickName: string;
  createdAt: string;
  closedAt: string;
}

export const ContinueVote = () => {
  const [datas, setDatas] = useState<continueData[]>([]);
  useEffect(() => {
    getMain({size: 6, filter: 'progress', setDatas: setDatas})
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
