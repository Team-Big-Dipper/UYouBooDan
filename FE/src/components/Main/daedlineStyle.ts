import styled from 'styled-components';

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
export const DeadLineCard = styled.tr`
  justify-content: space-between;
  height: 130px;
  background: white;
  border: 2px solid #d6d9dc;
  scroll-snap-align: start;
  transition: all 0.2s;
  cursor: pointer;
  td {
    display: table-cell;
    height: 130px;
    padding: 15px;
    &:hover {
      border: 2px solid #4285f4;
    }
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