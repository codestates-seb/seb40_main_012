import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const CollectionWriteBtnsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const ExitBtn = styled.button`
  border: 2px solid ${({ theme }) => theme.colors.dark};
  background-color: white;
  border: none;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
  display: flex;
  align-items: center;
  justify-content: center;
  div {
    padding-top: 2px;
    margin-left: 3px;
  }
`;

const CollectionWriteBtn = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.colors.mainColor};
  color: white;
  font-size: 15px;
  font-weight: 600;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.purple_1};
  }
`;

const CollectionWriteBtns = ({ handleCollectionWrite }) => {
  return (
    <ThemeProvider theme={theme}>
      <CollectionWriteBtnsContainer>
        <ExitBtn>
          <img
            src={process.env.PUBLIC_URL + '/images/exit_icon.svg'}
            alt="exit"
          />
          <div>나가기</div>
        </ExitBtn>
        <CollectionWriteBtn onClick={handleCollectionWrite}>
          생성하기
        </CollectionWriteBtn>
      </CollectionWriteBtnsContainer>
    </ThemeProvider>
  );
};

export default CollectionWriteBtns;
