import styled from "styled-components";

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