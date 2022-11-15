import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import { Link } from 'react-router-dom';

const TabBar = styled.ul`
  margin: 10px;
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  .selected {
    color: ${({ theme }) => theme.colors.dark};
  }
`;

const TabElement = styled.li`
  color: ${({ theme }) => theme.colors.lightgray};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 34px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    color: inherit;
    text-decoration: none;
  }
`;

const navObj = {
  all: '/pairing',
  movie: '/pairing/film',
  food: '/pairing/cuisine',
  music: '/pairing/music',
  book: '/pairing/book',
  etc: '/pairing/etc',
};

const PairingTab = ({ pathname = navObj.all }) => {
  return (
    <ThemeProvider theme={theme}>
      <TabBar>
        <StyledLink to={`${navObj.all}`}>
          <TabElement
            className={pathname === `${navObj.all}` ? 'selected' : ''}
          >
            전체
          </TabElement>
        </StyledLink>
        <StyledLink to={`${navObj.movie}`}>
          <TabElement
            className={pathname === `${navObj.movie}` ? 'selected' : ''}
          >
            영화
          </TabElement>
        </StyledLink>
        <StyledLink to={`${navObj.food}`}>
          <TabElement
            className={pathname === `${navObj.food}` ? 'selected' : ''}
          >
            음식 및 장소
          </TabElement>
        </StyledLink>
        <StyledLink to={`${navObj.music}`}>
          <TabElement
            className={pathname === `${navObj.music}` ? 'selected' : ''}
          >
            음악
          </TabElement>
        </StyledLink>
        <StyledLink to={`${navObj.book}`}>
          <TabElement
            className={pathname === `${navObj.book}` ? 'selected' : ''}
          >
            책
          </TabElement>
        </StyledLink>
        <StyledLink to={`${navObj.etc}`}>
          <TabElement
            className={pathname === `${navObj.etc}` ? 'selected' : ''}
          >
            기타
          </TabElement>
        </StyledLink>
      </TabBar>
    </ThemeProvider>
  );
};

export default PairingTab;
