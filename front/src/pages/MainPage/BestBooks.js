import styled from 'styled-components';
import Book from './Book';
import MainBooksTitle from './MainBooksTitle';

const BestBooksContainer = styled.div`
  display: flex;
  padding: 10px 40px;
  flex-direction: column;
`;

const BooksContainer = styled.div`
  display: flex;
`;

const BestBooks = () => {
  return (
    <BestBooksContainer>
      <MainBooksTitle title="요즘 뜨는 책" />
      <BooksContainer>
        <Book bookTitle="책 제목1" bookId={1} />
        <Book bookTitle="책 제목2" bookId={1} />
        <Book bookTitle="책 제목3" bookId={1} />
        <Book bookTitle="책 제목4" bookId={1} />
        <Book bookTitle="책 제목5" bookId={1} />
      </BooksContainer>
    </BestBooksContainer>
  );
};

export default BestBooks;
