import styled from 'styled-components';

export const PageContainer = styled.div`
  display: flex;
  padding: 5% 20% 0 20%;
  @media (min-width: 480px) and (max-width: 767px) {
    padding: 30px 80px 10px 80px;
  }
  @media (max-width: 479px) {
    padding: 30px 50px 10px 50px;
  }
`;
