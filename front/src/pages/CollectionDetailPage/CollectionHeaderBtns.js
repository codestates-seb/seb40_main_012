import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const CollectionHeaderBtnsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CollectionBtns = styled.div`
  display: flex;
  align-items: center;
  margin: 0 7px;
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 15px;
  font-weight: 500;
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;
const CollectionBookmark = styled(CollectionBtns)``;
const CollectionHeart = styled(CollectionBtns)``;
const CollectionShare = styled(CollectionBtns)``;

const CollectionHeaderBtns = () => {
  return (
    <ThemeProvider theme={theme}>
      <CollectionHeaderBtnsContainer>
        <CollectionBookmark>북마크</CollectionBookmark>
        <CollectionHeart>
          <img
            src={process.env.PUBLIC_URL + '/images/heart_filled_icon.svg'}
            alt="heart icon"
          />
          {'123'}
        </CollectionHeart>
        <CollectionShare>
          <img
            src={process.env.PUBLIC_URL + '/images/share_icon.svg'}
            alt="share icon"
          />
          공유하기
        </CollectionShare>
      </CollectionHeaderBtnsContainer>
    </ThemeProvider>
  );
};

export default CollectionHeaderBtns;
