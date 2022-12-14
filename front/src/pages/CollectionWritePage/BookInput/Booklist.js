import styled from 'styled-components';

const BooklistContainer = styled.div`
  padding: 5px 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  font-weight: 500;
  div.rating {
    width: 60px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainColor};
    margin-right: 8px;
    white-space: nowrap;
    @media screen and (max-width: 500px) {
      width: 40px;
      margin-right: 5px;
      font-size: 12px;
    }
  }
  .title {
    font-size: 14px;
    width: 100%;
    word-wrap: break-all;
    overflow: hidden;
    line-height: 1.5;
    max-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    @media screen and (max-width: 500px) {
      font-size: 12px;
    }
  }
  .author {
    display: flex;
    font-size: 12px;
    flex: 1;
    word-wrap: break-all;
    overflow: hidden;
    line-height: 1.5;
    max-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    @media screen and (max-width: 500px) {
      font-size: 10px;
      width: 100%;
      text-align: end;
    }
  }
  &:hover {
    cursor: pointer;
    background-color: #f5f5f5;
  }
  @media screen and (max-width: 500px) {
    padding: 5px;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Container = styled.div`
  display: flex;
  flex: 3;
  align-items: center;
`;

const Booklist = ({ title, author, rating, isbn, handleSetNewBooks }) => {
  return (
    <BooklistContainer
      onClick={() => {
        handleSetNewBooks(isbn);
      }}
    >
      <Container>
        <div className="rating">★ {rating}</div>
        <div className="title">{title}</div>
      </Container>
      <div className="author">{author}</div>
    </BooklistContainer>
  );
};

export default Booklist;
