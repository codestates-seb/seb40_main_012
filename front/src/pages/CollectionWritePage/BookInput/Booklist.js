import styled from 'styled-components';

const BooklistContainer = styled.div`
  padding: 5px 20px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  white-space: nowrap;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  font-weight: 500;
  .rating {
    width: 60px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainColor};
    @media screen and (max-width: 500px) {
      width: 30px;
      margin-right: 5px;
      font-size: 12px;
    }
  }
  .title {
    width: 60%;
    font-size: 14px;
    @media screen and (max-width: 500px) {
      font-size: 12px;
    }
  }
  .author {
    font-size: 12px;
    @media screen and (max-width: 500px) {
      font-size: 10px;
    }
  }
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
  @media screen and (max-width: 500px) {
    padding: 5px;
  }
`;

const Booklist = ({ title, author, rating, isbn, handleSetNewBooks }) => {
  return (
    <BooklistContainer
      onClick={() => {
        handleSetNewBooks(isbn);
      }}
    >
      <div className="rating">★ {rating}</div>
      <div className="title">{title}</div>
      <div className="author">{author}</div>
    </BooklistContainer>
  );
};

export default Booklist;
