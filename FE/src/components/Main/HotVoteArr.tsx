import React from "react";
import * as style from './style';
import { Card } from './Card';

interface propTypes {
  hotDatas: any;
}

export const HotVoteArr = ({hotDatas}: propTypes) => {
  return(
    <style.CardAdd>
      <style.Crads>
        {hotDatas?.filter((data:any,idx:number) => data.category === '음식' && idx < 3)
          .map((data:any,idx:number)=>{
          return(
            <Card
              key={idx}
              name={"hot"}
              idx={idx}
              data={data}
              />
          )
        })}
      </style.Crads>
      <style.AddContainer>
        <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
      </style.AddContainer>
    </style.CardAdd>
  )
}