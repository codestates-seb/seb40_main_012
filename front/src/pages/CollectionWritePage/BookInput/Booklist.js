import styled from 'styled-components';

const BooklistContainer = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  .rating {
    margin-right: 20px;
    color: ${({ theme }) => theme.colors.mainColor};
    font-weight: 700;
  }
  .title {
    width: 60%;
    font-weight: 700;
  }
  .author {
    font-size: 13px;
    font-weight: 600;
  }
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
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
