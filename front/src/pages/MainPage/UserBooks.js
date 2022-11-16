import styled from 'styled-components';
import Book from './Book';
import MainBooksTitle from './MainBooksTitle';

const UserBooksContainer = styled.div`
  display: flex;
  padding: 10px 40px;
  flex-direction: column;
`;

const BooksContainer = styled.div`
  display: flex;
`;

const UserBooks = ({ nickname }) => {
  return (
    <UserBooksContainer>
      <MainBooksTitle title={`${nickname}님을 위한 책`} />
      <BooksContainer>
        <Book bookTitle="책 제목1" />
        <Book bookTitle="책 제목2" />
        <Book bookTitle="책 제목3" />
        <Book bookTitle="책 제목4" />
        <Book bookTitle="책 제목5" />
      </BooksContainer>
    </UserBooksContainer>
  );
};

export default UserBooks;
