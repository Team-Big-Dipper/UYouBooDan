import React, { useEffect, useState } from "react";
import * as Style from './continueStyle';
import axios, { AxiosResponse, AxiosError } from 'axios';

export const ContinueVote = () => {
  const [datas, setDatas] = useState<Object[]>();
  // useEffect(()=>{
  //   axios
  //     .get('/api/topics/continue')
  //     .then((res) => {
  //       try{
  //         console.log('continueVote :', res.data);
  //         setDatas(res.data);
  //       }
  //       catch{
  //         console.log('진행 요청 실패!');
  //       }
  //     })
  // },[])
  return(
    <Style.CarouselContainer>
        <Style.Cards>
          {/* {datas?.map((data,idx)=>{(
            <Style.Card>
            <div>
              <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                Lorem ipsum dolor sit amet
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </Style.AuthorDay>
          </Style.Card>
          )})} */}
          <Style.Card>
            <div>
              <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                Lorem ipsum dolor sit amet
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </Style.AuthorDay>
          </Style.Card>
          <Style.Card>
            <div>
              <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                Lorem ipsum dolor sit amet
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </Style.AuthorDay>
          </Style.Card>
          <Style.Card>
            <div>
              <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                Lorem ipsum dolor sit amet
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </Style.AuthorDay>
          </Style.Card>
          <Style.Card>
            <div>
              <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                Lorem ipsum dolor sit amet
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </Style.AuthorDay>
          </Style.Card>
          <Style.Card>
            <div>
              <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                Lorem ipsum dolor sit amet
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </Style.AuthorDay>
          </Style.Card>
          <Style.Card>
            <div>
              <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
              <Style.CardContent>
                Lorem ipsum dolor sit amet
              </Style.CardContent>
            </div>
            <Style.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </Style.AuthorDay>
          </Style.Card>
        </Style.Cards>
      </Style.CarouselContainer>
  )
}