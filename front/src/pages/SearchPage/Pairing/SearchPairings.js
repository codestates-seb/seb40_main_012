import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../../api/axios';
import { useSelector } from 'react-redux';
import { selectSearchKeyword } from 'store/modules/searchSlice';
import { NoResultContainer } from '../Book/SearchBooks';
import SearchPairing from './SearchPairing';

const SearchPairingsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const LoadingContainer = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 50px;
    height: 50px;
  }
  &.hide {
    display: none;
  }
`;

const SearchPairings = () => {
  const keyword = useSelector(selectSearchKeyword);
  const [pairings, setPairings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/search?Category=pairings&Query=${keyword}`)
      .then((res) => {
        setPairings([...res.data]);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [keyword]);

  return (
    <SearchPairingsContainer>
      {isLoading ? (
        <LoadingContainer className={isLoading ? 'show' : 'hide'}>
          <img
            src={process.env.PUBLIC_URL + '/images/spinner.gif'}
            alt="spinner"
          />
        </LoadingContainer>
      ) : (
        <>
          {pairings.length === 0 ? (
            <NoResultContainer>
              검색 결과가 존재하지 않습니다.
            </NoResultContainer>
          ) : (
            <>
              {pairings?.map((el) => {
                return (
                  <SearchPairing
                    key={el.pairingId}
                    pairingId={el.pairingId}
                    title={el.title}
                    img={el.imagePath}
                    like={el.likeCount}
                    comment={el.comments}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </SearchPairingsContainer>
  );
};

export default SearchPairings;
