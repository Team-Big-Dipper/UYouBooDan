import { style } from '@mui/system';
import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  padding: 5% 20% 0 20%;
  flex-direction: column;
  @media (max-width: 375px) {
    padding: 0;
  }
`;

interface PropsType {
  isClosed: boolean;
}
export const TotalVoteCount = styled.div<PropsType>`
  margin: ${(props) => (props.isClosed ? '35px 0 10px 0' : '10px 0 0 0')};
  text-align: center;
  @media (max-width: 375px) {
    margin: ${(props) => (props.isClosed ? '25px 0 0 0' : '5px 0 0 0')};
  }
`;

export const CurrentCategoty = styled.p`
  @media (max-width: 375px) {
    display: none;
  }
`;
