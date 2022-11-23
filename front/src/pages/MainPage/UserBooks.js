import axios from '../../api/axios';
import { useEffect, useState } from 'react';
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
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/books/recommended')
      .then((response) => {
        setUserBooks(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <UserBooksContainer>
      <MainBooksTitle title={`${nickname}님을 위한 책`} />
      <BooksContainer>
        {userBooks.map((el) => {
          return (
            <Book
              key={el.isbn13}
              bookTitle={el.title}
              isbn={el.isbn13}
              cover={el.cover}
            />
          );
        })}
      </BooksContainer>
    </UserBooksContainer>
  );
};

export default UserBooks;
