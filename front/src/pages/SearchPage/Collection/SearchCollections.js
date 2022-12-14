import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../../api/axios';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSearchKeyword,
  selectSearchMode,
  setSearchMode,
} from 'store/modules/searchSlice';
import SearchCollection from './SearchCollection';
import { NoResultContainer } from '../Book/SearchBooks';

const SearchCollectionsContainer = styled.div`
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

const SearchCollections = () => {
  const keyword = useSelector(selectSearchKeyword);
  const mode = useSelector(selectSearchMode);
  const dispatch = useDispatch();
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/search?Category=collections&Query=${keyword}`) //좋아요순 검색
      .then((res) => {
        setCollections([...res.data]);
        dispatch(setSearchMode({ mode: false }));
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        dispatch(setSearchMode({ mode: false }));
      });
  }, [mode]);

  return (
    <SearchCollectionsContainer>
      {isLoading ? (
        <LoadingContainer className={isLoading ? 'show' : 'hide'}>
          <img
            src={process.env.PUBLIC_URL + '/images/spinner.gif'}
            alt="spinner"
          />
        </LoadingContainer>
      ) : (
        <>
          {collections.length === 0 ? (
            <NoResultContainer>
              검색 결과가 존재하지 않습니다.
            </NoResultContainer>
          ) : (
            <>
              {collections?.map((el) => {
                return (
                  <SearchCollection
                    key={el.collectionId}
                    collectionId={el.collectionId}
                    title={el.title}
                    content={el.content}
                    like={el.likeCount}
                    comment={el.comments}
                    date={el.lastModifiedAt}
                    cover={el.collectionCover}
                  />
                );
              })}
            </>
          )}
        </>
      )}
    </SearchCollectionsContainer>
  );
};

export default SearchCollections;
