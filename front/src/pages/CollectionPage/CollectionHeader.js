import { Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const CollectionHeaderContainer = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CollectionInfo = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const CollectionWriteBtn = styled.button`
  width: 90px;
  height: 30px;
  background-color: white;
  border: none;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  background-color: ${({ theme }) => theme.colors.purple_3};
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_2};
    cursor: pointer;
  }
`;

const CollectionHeader = () => {
  return (
    <ThemeProvider theme={theme}>
      <CollectionHeaderContainer>
        <CollectionInfo>
          당신만을 위한 <span>Cherry Pick</span> 컬렉션
        </CollectionInfo>
        <Link to="/collection/write">
          <CollectionWriteBtn>컬렉션 만들기</CollectionWriteBtn>
        </Link>
      </CollectionHeaderContainer>
    </ThemeProvider>
  );
};

export default CollectionHeader;
