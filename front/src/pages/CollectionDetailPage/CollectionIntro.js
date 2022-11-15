import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const CollectionIntroContainer = styled.div`
  padding: 25px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
`;

const CollectionIntroTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 700;
  padding-bottom: 10px;
`;
const CollectionIntroContent = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.darkgray};
`;
const CollectionIntro = ({ intro }) => {
  return (
    <ThemeProvider theme={theme}>
      <CollectionIntroContainer>
        <CollectionIntroTitle>컬렉션 소개</CollectionIntroTitle>
        <CollectionIntroContent>{intro}</CollectionIntroContent>
      </CollectionIntroContainer>
    </ThemeProvider>
  );
};

export default CollectionIntro;
