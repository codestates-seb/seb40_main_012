import styled from 'styled-components';
import { ToDateString } from 'util/ToDateString';
import { useNavigate } from 'react-router-dom';

const SearchCollectionContainer = styled.div`
  width: 33%;
  display: flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
  }
  padding: 10px 15px;
  @media screen and (max-width: 980px) {
    padding: 5px 10px;
    width: 50%;
  }
  @media screen and (max-width: 500px) {
    padding: 5px;
  }
`;

const CollectionTitleContainer = styled.div`
  width: 100%;
  font-size: 18px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  word-wrap: break-all;
  overflow: hidden;
  line-height: 1.5;
  max-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  &:hover {
    color: ${({ theme }) => theme.colors.mainColor};
  }
  @media screen and (max-width: 980px) {
    font-size: 16px;
  }
  @media screen and (max-width: 640px) {
    font-size: 14px;
  }
  @media screen and (max-width: 500px) {
    font-size: 13px;
  }
`;

const CollectionContentContainer = styled.div`
  width: 100%;
  margin: 5px 0;
  padding: 3px;
  background-color: ${({ theme }) => theme.colors.purple_3};
  display: flex;
  justify-content: center;
`;

const CollectionInfoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.dark};
  div {
    display: flex;
    align-items: center;
  }
  div.count {
    flex: 1;
    .like,
    .count {
      margin-right: 10px;
    }
    @media screen and (max-width: 640px) {
      font-size: 14px;
    }
    @media screen and (max-width: 500px) {
      font-size: 13px;
    }
  }
  .date {
    font-size: 13px;
    @media screen and (max-width: 640px) {
      font-size: 11px;
    }
    @media screen and (max-width: 640px) {
      font-size: 10px;
    }
  }
  img {
    width: 20px;
    object-fit: cover;
    margin-right: 3px;
    @media screen and (max-width: 640px) {
      width: 15px;
    }
  }
`;

const CollectionCoverContainer = styled.div`
  width: 33%;
  display: flex;
  img {
    width: 100%;
    aspect-ratio: 7/ 10;
    object-fit: cover;
  }
  padding: 3px;
  div {
    width: 100%;
    aspect-ratio: 7 / 10;
  }
`;

const SearchCollection = ({
  collectionId,
  title,
  like,
  comment,
  date,
  cover,
}) => {
  const navigate = useNavigate();

  return (
    <SearchCollectionContainer
      onClick={() => navigate(`/collection/${collectionId}`)}
    >
      <CollectionTitleContainer>{title}</CollectionTitleContainer>
      <CollectionContentContainer>
        <CollectionCoverContainer>
          {cover[0] ? <img src={cover[0]} alt="book cover" /> : <div></div>}
        </CollectionCoverContainer>
        <CollectionCoverContainer>
          {cover[1] ? <img src={cover[1]} alt="book cover" /> : <div></div>}
        </CollectionCoverContainer>
        <CollectionCoverContainer>
          {cover[2] ? <img src={cover[2]} alt="book cover" /> : <div></div>}
        </CollectionCoverContainer>
      </CollectionContentContainer>
      <CollectionInfoContainer>
        <div className="count">
          <div className="like">
            <img
              src={process.env.PUBLIC_URL + '/images/p_heart_filled_icon.svg'}
              alt="like"
            />
            {like}
          </div>
          <div className="comment">
            <img
              src={process.env.PUBLIC_URL + '/images/comment_icon.svg'}
              alt="comment"
            />
            {comment.length}
          </div>
        </div>
        <div className="modified">
          <div className="date">{ToDateString(date)}</div>
        </div>
      </CollectionInfoContainer>
    </SearchCollectionContainer>
  );
};

export default SearchCollection;
