import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

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
`;

const SearchBookBtn = styled(SearchTabBtn)`
  &.book {
    border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
  }
`;
// const SearchPairingBtn = styled(SearchTabBtn)`
//   &.pairing {
//     border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
//   }
// `;
// const SearchCollectionBtn = styled(SearchTabBtn)`
//   &.collection {
//     border-bottom: 2px solid ${({ theme }) => theme.colors.mainColor};
//   }
// `;

const SearchTab = () => {
  const location = useLocation();
  const current = location.pathname.split('/')[2];

  return (
    <SearchTabContainer>
      <Link to="/search/book">
        <SearchBookBtn className={current}>검색 결과</SearchBookBtn>
      </Link>
      {/* <Link to="/search/pairing">
        <SearchPairingBtn className={current}>페어링</SearchPairingBtn>
      </Link>
      <Link to="/search/collection">
        <SearchCollectionBtn className={current}>컬렉션</SearchCollectionBtn>
      </Link> */}
    </SearchTabContainer>
  );
};

export default SearchTab;
