import Link from 'next/link';
import styled from 'styled-components';

interface PropsType {
  isClosed: boolean;
}

export const PageContainer = styled.div`
  display: flex;
  padding: 5% 20% 0 20%;
  flex-direction: column;
`;

export const TotalVoteCount = styled.div<PropsType>`
  margin: ${(props) => (props.isClosed ? '35px 0 10px 0' : '10px 0 0 0')};
  text-align: center;
  @media (max-width: 479px) {
    margin: ${(props) => (props.isClosed ? '25px 0 0 0' : '5px 0 0 0')};
  }
`;

export const CurrentCategoty = styled.p`
  font-size: 1rem;
  margin: 5px 0;
  @media (max-width: 479px) {
    display: none;
  }
`;

export const LinkButton = styled(Link)`
  text-decoration: none;
  cursor: default;
  color: black;
`;

export const VoteContentLayout = styled.div`
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-left: 55px;
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 0;
  }
  @media (max-width: 479px) {
    padding: 0px;
  }
`;
