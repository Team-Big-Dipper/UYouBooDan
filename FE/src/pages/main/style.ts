import styled from 'styled-components';
import Frame from '../../../public/Mainimage.png';
import HotFrame from '../../../public/HotFrame.png';
import MainImageVote from '../../../public/MainImageVote.png';
import MainTopMobile from '../../../public/MainTopMobile.png'
import HotMobile from '../../../public/HotMobile.png'
import Link from 'next/link';

export const MainContainer = styled.div`
  flex: 1;
`;

export const MakeVoteContainer = styled.div`
  width: 100%;
  height: 40vh;
  background-image: url(${Frame.src});
  background-size: 100% 100%;
  padding: 0 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media screen and (max-width: 768px) {
    background-image: url(${MainTopMobile.src});
    justify-content: flex-start;
    padding-top: 50px;
    height: 50vh;
    padding: 20px 30px;
  }
`;

export const MakeVoteContent = styled.div`
  width: fit-content;
  div {
    font-size: 1.5rem;
    font-family: 'yg-jalnan' !important;
    margin-bottom: 5px;
    color: #242424;
  }
`;

export const CreateVoteBtn = styled(Link)`
  color: white;
  background-color: #4285f4;
  font-family: 'yg-jalnan' !important;
  border: none;
  height: 50px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  text-decoration: none;
`;

//진행중인투표
export const ContinueVoteContainer = styled.div`
  padding: 0 20%;
  height: 40vh;
  justify-content: center;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 0 30px;
  }
`;
export const ContinueTitle = styled.div`
  width: 150px;
  h2 {
    font-family: 'yg-jalnan' !important;
    font-size: 1.2rem;
    color: #242424;
    line-height: 1.5rem;
  }
  div {
    color: #667085;
    margin-top: 10px;
    font-size: 0.9rem;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: flex-end;
  }
`;

export const CarouselContainer = styled.div`
  padding: 0 15px;
  margin: 0 auto;
  width: 75%;
  @media screen and (max-width: 768px) {
    align-items: flex-start;
    width: 100%;
    padding: 0px;
  }
`;
export const Cards = styled.ul`
  display: grid;
  grid-column-gap: 10px;
  grid-auto-flow: column;
  padding: 25px 0px;
  list-style: none;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  &::-webkit-scrollbar {
    height: 8px;
    cursor: pointer;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 92px;
  }
  &::-webkit-scrollbar-track {
    border-radius: 92px;
  }
  &::-webkit-scrollbar-thumb {
    background: #4285f4;
  }
  &::-webkit-scrollbar-track {
    background: #d6d9dc;
  }
`;

export const Card = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 130px;
  width: 200px;
  padding: 15px;
  background: white;
  border: 2px solid #d6d9dc;
  border-radius: 12px;
  /* box-shadow: 0 5px 15px rgba(0, 0, 0, 15%); */
  scroll-snap-align: start;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    border: 2px solid #4285f4;
  }
`;
export const CardTitle = styled.h3`
  font-size: 0.9rem;
  color: #667085;
  span {
    color: white;
    background-color: #4285f4;
    padding: 2px 10px;
    border-radius: 50px;
    margin-left: 10px;
  }
`;
export const CardContent = styled.div`
  margin: 20px 0;
  max-width: 85%;
  font-weight: bold;
`;
export const AuthorDay = styled.div`
  display: flex;
  justify-content: space-between;
  color: #667085;
  font-size: 0.8rem;
`;

//핫한 투표
export const HotContainer = styled.div`
  height: 50vh;
  background-image: url(${HotFrame.src});
  background-size: 100% 100%;
  padding: 0 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    background-image: url(${HotMobile.src});
    height: 100%;
    padding: 50px 0;
  }
`;
export const HotTitle = styled.div`
  color: #242424;
  font-family: 'yg-jalnan' !important;
  font-size: 1.2rem;
  margin-bottom: 20px;
  span {
    color: #4285f4;
    font-family: 'yg-jalnan' !important;
  }
`;

//이미지투표+마감임박투표
export const ImageDeadLineContainer = styled.div`
  height: 90vh;
  padding: 0 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    padding: 50px 0;
  }
`;

export const ImageContainer = styled.div`
  height: 80%;
  width: 50%;
  background-image: url(${MainImageVote.src});
  background-size: 100% 100%;
  @media screen and (max-width: 768px){
    display: none;
    width: 100%;
    height: fit-content;
  }
`;
export const DeadLineContainer = styled.div`
  width: 45%;
  @media screen and (max-width: 768px) {
    margin-top: 20px;
  }
`;
export const DeadLineTitle = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  .title {
    color: #242424;
    font-family: 'yg-jalnan' !important;
    font-size: 1.2rem;

  }
  .more {
    color: #667085;
    font-size: 0.9rem;
  }
`;
export const DeadLineTable = styled.div`
  width: 100%;
`;
export const DeadLineCards = styled.table`
  /* display: flex;
  flex-direction: column; */
  display: table;
  border-collapse: collapse;
  width: 100%;
  border-radius: 12px;
`;
export const DeadLineCard = styled.td`
  display: flex;
  display: table-cell;
  flex-direction: column;
  justify-content: space-between;
  height: 130px;
  padding: 15px;
  background: white;
  border: 1px solid #d6d9dc;
  scroll-snap-align: start;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    border: 1px solid #4285f4;
  }
  &.top {
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }
  &.bottom {
    border-end-start-radius: 12px;
    border-end-end-radius: 12px;
  }
`;
