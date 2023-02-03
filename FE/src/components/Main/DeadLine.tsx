import React from "react";
import * as Style from './daedlineStyle';

export const DeadLine = () => {
  return(
    <Style.DeadLineTable>
            <Style.DeadLineCards>
              <tbody>
                  <Style.DeadLineCard className='top'>
                    <td>
                      <div>
                        <Style.CardTitle>#카테고리&nbsp;<span>D-3</span></Style.CardTitle>
                        <Style.CardContent>
                          Lorem ipsum dolor sit amet
                        </Style.CardContent>
                      </div>
                      <Style.AuthorDay>
                        작성자
                        {/* <span>2023.01.16</span> */}
                      </Style.AuthorDay>
                    </td>
                  </Style.DeadLineCard>
                  <Style.DeadLineCard className='second'>
                    <td>
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
                    </td>
                  </Style.DeadLineCard>
                  <Style.DeadLineCard>
                    <td>
                      <div>
                        <Style.CardTitle>
                          #카테고리&nbsp;<span>D-3</span>
                        </Style.CardTitle>
                        <Style.CardContent>Lorem ipsum dolor sit amet</Style.CardContent>
                      </div>
                      <Style.AuthorDay>
                        작성자
                        <span>2023.01.16</span>
                      </Style.AuthorDay>
                    </td>
                  </Style.DeadLineCard>
                  <Style.DeadLineCard className='bottom'>
                    <td>
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
                    </td>
                  </Style.DeadLineCard>
              </tbody>
            </Style.DeadLineCards>
          </Style.DeadLineTable>
  )
}