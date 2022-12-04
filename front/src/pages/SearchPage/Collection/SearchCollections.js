import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from '../../../api/axios';
import { useSelector } from 'react-redux';
import { selectSearchKeyword } from 'store/modules/searchSlice';
import SearchCollection from './SearchCollection';

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
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/api/search?Category=collections&Query=${keyword}`) //좋아요순 검색
      .then((res) => {
        setCollections([...res.data]);
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  }, [keyword]);

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
              />
            );
          })}
        </>
      )}
    </SearchCollectionsContainer>
  );
};

export default SearchCollections;
