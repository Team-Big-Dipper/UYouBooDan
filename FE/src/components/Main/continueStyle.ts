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
export const Date = styled.span``;