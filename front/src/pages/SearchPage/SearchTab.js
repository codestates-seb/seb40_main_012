import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSearchKeyword } from 'store/modules/searchSlice';

const SearchTabContainer = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray};
  width: 100%;
  margin: 15px 0;
`;

const SearchTabBtn = styled.button`
  font-size: 20px;
  background-color: transparent;
  border: none;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  padding: 10px 15px;
  border-bottom: 2px solid white;
  &:hover {
    cursor: pointer;
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
  }
  @media screen and (max-width: 640px) {
    font-size: 18px;
  }
  @media screen and (max-width: 500px) {
    font-size: 15px;
    padding: 10px;
  }
`;

const SearchBookBtn = styled(SearchTabBtn)`
  &.book {
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
  }
`;
const SearchPairingBtn = styled(SearchTabBtn)`
  &.pairing {
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
  }
`;
const SearchCollectionBtn = styled(SearchTabBtn)`
  &.collection {
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
  }
`;

const SearchTab = () => {
  const location = useLocation();
  const type = location.pathname.split('/')[2];
  const keyword = useSelector(selectSearchKeyword);

  return (
    <SearchTabContainer>
      <Link to={`/search/book/${keyword}`}>
        <SearchBookBtn className={type}>책</SearchBookBtn>
      </Link>
      <Link to={`/search/pairing/${keyword}`}>
        <SearchPairingBtn className={type}>페어링</SearchPairingBtn>
      </Link>
      <Link to={`/search/collection/${keyword}`}>
        <SearchCollectionBtn className={type}>컬렉션</SearchCollectionBtn>
      </Link>
    </SearchTabContainer>
  );
};

export default SearchTab;
