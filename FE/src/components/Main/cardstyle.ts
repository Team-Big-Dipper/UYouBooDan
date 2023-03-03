import styled from 'styled-components';

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
  &.hot {
    width: 30vw;
    max-width: 300px;
    @media screen and (max-width: 768px) {
      width: 100%;
      max-width: none;
    }
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
