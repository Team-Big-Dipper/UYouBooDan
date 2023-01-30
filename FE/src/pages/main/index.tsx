import React, {useState, useEffect, Suspense} from 'react';
import * as S from './style';
import { Fingerprint } from '../../assets/fingerprint';
import { HotVote } from '../../components/Main/HotVote';
import { MainDeadMobile } from '../../assets/mainDeadMobile';

function Main() {
  return(
  <S.MainContainer>
    <S.MakeVoteContainer>
      <S.MakeVoteContent>
        <div>이젠 혼자</div>
        <div>고민하지 마세요.</div>
        <div>우유부단이 함께합니다.</div>
        <S.CreateVoteBtn href="/createvote"><Fingerprint />&nbsp;&nbsp;나만의 투표 만들기</S.CreateVoteBtn>
      </S.MakeVoteContent>
    </S.MakeVoteContainer>
    <S.ContinueVoteContainer>
      <S.ContinueTitle>
        <h2>진행중인 투표에 <br />참여해보세요.</h2>
        <div>더보기 &gt;</div>
      </S.ContinueTitle>
      <S.CarouselContainer>
        <S.Cards>
          <S.Card>
            <div>
              <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
          <S.Card>
            <div>
              <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
              <S.CardContent>
                Lorem ipsum dolor sit amet
              </S.CardContent>
            </div>
            <S.AuthorDay>
              작성자
              <span>2023.01.16</span>
            </S.AuthorDay>
          </S.Card>
        </S.Cards>
      </S.CarouselContainer>
    </S.ContinueVoteContainer>
    <S.HotContainer>
      <S.HotTitle><span>핫한</span>&nbsp;투표를 만나보세요!</S.HotTitle>
      <HotVote />
    </S.HotContainer>
    <S.ImageDeadLineContainer>
      <S.ImageContainer></S.ImageContainer>
      <MainDeadMobile />
      <S.DeadLineContainer>
        <S.DeadLineTitle>
          <div className='title'>마감임박 투표</div>
          <div className='more'>더보기 &gt;</div>
        </S.DeadLineTitle>
          <S.DeadLineTable>
            <S.DeadLineCards>
              <tbody>
                <tr>
                  <S.DeadLineCard className='top'>
                    <div>
                      <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
                      <S.CardContent>
                        Lorem ipsum dolor sit amet
                      </S.CardContent>
                    </div>
                    <S.AuthorDay>
                      작성자
                      {/* <span>2023.01.16</span> */}
                    </S.AuthorDay>
                  </S.DeadLineCard>
                </tr>
                <tr>
                  <S.DeadLineCard className='second'>
                    <div>
                      <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
                      <S.CardContent>
                        Lorem ipsum dolor sit amet
                      </S.CardContent>
                    </div>
                    <S.AuthorDay>
                      작성자
                      <span>2023.01.16</span>
                    </S.AuthorDay>
                  </S.DeadLineCard>
                </tr>
                <tr>
                  <S.DeadLineCard>
                    <div>
                      <S.CardTitle>
                        #카테고리&nbsp;<span>D-3</span>
                      </S.CardTitle>
                      <S.CardContent>Lorem ipsum dolor sit amet</S.CardContent>
                    </div>
                    <S.AuthorDay>
                      작성자
                      <span>2023.01.16</span>
                    </S.AuthorDay>
                  </S.DeadLineCard>
                </tr>
                <tr>
                  <S.DeadLineCard className='bottom'>
                    <div>
                      <S.CardTitle>#카테고리&nbsp;<span>D-3</span></S.CardTitle>
                      <S.CardContent>
                        Lorem ipsum dolor sit amet
                      </S.CardContent>
                    </div>
                    <S.AuthorDay>
                      작성자
                      <span>2023.01.16</span>
                    </S.AuthorDay>
                  </S.DeadLineCard>
                </tr>
              </tbody>
            </S.DeadLineCards>
          </S.DeadLineTable>
      </S.DeadLineContainer>
    </S.ImageDeadLineContainer>
  </S.MainContainer>
  );
}

export default Main;
