import React from "react";
import * as style from './style';
import { Card } from './Card';
interface hotData {
  topicId: number,
  category: string;
  title: string;
  nickName: string;
  createdAt: string,
  closedAt: string;
}

export const HotVoteArr = (category: string[], hotDatas: hotData[]) => {
    let object:{[propName: string]: JSX.Element} = {};
    category.forEach((el:string) => {
      object[el] = (<style.CardAdd>
        <style.Crads>
          {hotDatas?.filter((data:any,idx:number) => data.category === `${el}` && idx < 3)
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
        {/* <style.AddContainer>
          <style.Add href="/topics?size=6&page=1&filter=hot">+  더보기</style.Add>
        </style.AddContainer> */}
      </style.CardAdd>)
    })
    return object;
  }