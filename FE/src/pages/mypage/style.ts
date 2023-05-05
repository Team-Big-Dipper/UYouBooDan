import styled from 'styled-components';

export const MyPageContainer = styled.div`
  flex: 1;
  padding: 60px 240px;
  @media (max-width: 768px) {
    padding: 60px 90px;
  }
  @media (max-width: 600px) {
    padding: 60px 40px;
  }
  @media (max-width: 500px) {
    padding: 60px 20px;
  }
`;
