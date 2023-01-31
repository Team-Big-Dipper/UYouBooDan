import React from "react";
import * as Style from './daedlineStyle';

export const DeadLine = () => {
  return(
    <Style.DeadLineTable>
            <Style.DeadLineCards>
              <tbody>
                <tr>
                  <Style.DeadLineCard className='top'>
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
                  </Style.DeadLineCard>
                </tr>
                <tr>
                  <Style.DeadLineCard className='second'>
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
                  </Style.DeadLineCard>
                </tr>
                <tr>
                  <Style.DeadLineCard>
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
                  </Style.DeadLineCard>
                </tr>
                <tr>
                  <Style.DeadLineCard className='bottom'>
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
                  </Style.DeadLineCard>
                </tr>
              </tbody>
            </Style.DeadLineCards>
          </Style.DeadLineTable>
  )
}