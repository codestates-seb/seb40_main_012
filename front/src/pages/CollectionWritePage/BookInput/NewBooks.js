import styled from 'styled-components';
import NewBook from './NewBook';

const NewBooksContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const NewBooksTitle = styled.div`
  width: 100%;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.mainColor};
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;

const Books = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const NewBooks = ({ newBooks, setNewBooks, newBooksInfo, setNewBooksInfo }) => {
  const handleDeleteBook = (isbn) => {
    const tmp = newBooks.filter((el) => {
      return String(el) !== String(isbn);
    });
    setNewBooks(tmp);
    const tmpInfo = newBooksInfo.filter((el) => {
      return el.isbn13 !== String(isbn);
    });
    setNewBooksInfo(tmpInfo);
  };

  return (
    <NewBooksContainer>
      <NewBooksTitle>나의 새로운 컬렉션</NewBooksTitle>
      <Books>
        {newBooksInfo.map((el, idx) => {
          return (
            <NewBook
              key={idx}
              title={el.title}
              author={el.author}
              cover={el.cover ? el.cover : el.bookCover}
              isbn={el.isbn13}
              remove={true}
              handleDeleteBook={handleDeleteBook}
            />
          );
        })}
      </Books>
    </NewBooksContainer>
  );
};

export default NewBooks;
