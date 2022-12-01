import styled from 'styled-components';
import Guide from '../../MainPage/Guide';
import { Link } from 'react-router-dom';

const TabBar = styled.ul`
  margin: 10px;
  font-size: 15px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  list-style: none;
  .selected {
    color: ${({ theme }) => theme.colors.dark};
  }
  @media screen and (min-width: 500px) {
    font-size: 18px;
  }
`;

const TabElement = styled.li`
  color: ${({ theme }) => theme.colors.lightgray};
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px;
  height: 34px;
  font-weight: bold;
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

const HeadContainer = styled.div`
  width: 100%;
  margin-top: 22px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const HeadTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  span {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  @media screen and (min-width: 500px) {
    font-size: 24px;
  }
`;

const navObj = {
  all: '/pairing',
  film: '/pairing/film',
  cuisine: '/pairing/cuisine',
  music: '/pairing/music',
  book: '/pairing/book',
  etc: '/pairing/etc',
};

const PairingTab = ({ pathname = navObj.all }) => {
  return (
    <>
      <HeadContainer>
        <HeadTitle>
          깊고 넓은 즐거움, <span>Cherry Pick</span> 페어링
        </HeadTitle>
        <Guide type="pairing" />
      </HeadContainer>
      <TabBar>
        <StyledLink to={`${navObj.all}`}>
          <TabElement
            className={pathname === `${navObj.all}` ? 'selected' : ''}
          >
            전체
          </TabElement>
        </StyledLink>
        <StyledLink to={`${navObj.film}`}>
          <TabElement
            className={pathname === `${navObj.film}` ? 'selected' : ''}
          >
            영화
          </TabElement>
        </StyledLink>
        <StyledLink to={`${navObj.cuisine}`}>
          <TabElement
            className={pathname === `${navObj.cuisine}` ? 'selected' : ''}
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
    </>
  );
};

export default PairingTab;
