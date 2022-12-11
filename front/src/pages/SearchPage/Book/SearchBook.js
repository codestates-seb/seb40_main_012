import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const SearchBookContainer = styled.div`
  width: 50%;
  display: flex;
  padding: 8px;
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
  }
  @media screen and (max-width: 640px) {
    width: 100%;
  }
  &:hover {
    cursor: pointer;
  }
`;

const BookCoverContainer = styled.div`
  width: 20%;
`;

const BookInfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  font-weight: 400;
  word-break: keep-all;
  .title {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 16px;
  }
  .author {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 13px;
  }
`;

const SearchBook = ({ cover, title, author, year, isbn }) => {
  const navigate = useNavigate();

  return (
    <SearchBookContainer
      onClick={() => {
        navigate(`/book/${isbn}`);
      }}
    >
      <BookCoverContainer>
        <img src={cover} alt="book cover" />
      </BookCoverContainer>
      <BookInfoContainer>
        <div className="title">{title}</div>
        <div className="author">{`${year.slice(0, 4)} · ${author}`}</div>
      </BookInfoContainer>
    </SearchBookContainer>
  );
};

export default SearchBook;
