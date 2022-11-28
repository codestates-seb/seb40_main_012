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
  white-space: nowrap;
  .title {
    color: ${({ theme }) => theme.colors.dark};
    font-size: 17px;
  }
  .author {
    color: ${({ theme }) => theme.colors.gray};
    font-size: 14px;
  }
`;

const SearchBook = () => {
  return (
    <SearchBookContainer>
      <BookCoverContainer>
        <img
          src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
          alt="cover"
        />
      </BookCoverContainer>
      <BookInfoContainer>
        <div className="title">책 제목</div>
        <div className="author">{`${2022} · ${`저자-----`}`}</div>
      </BookInfoContainer>
    </SearchBookContainer>
  );
};

export default SearchBook;
