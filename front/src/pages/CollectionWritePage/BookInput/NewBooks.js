import axios from 'axios';
import { useEffect, useState } from 'react';
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
`;

const Books = styled.div`
  display: flex;
  background-color: white;
  padding: 15px;
  margin: 10px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray};
`;

const NewBooks = ({ newBooks }) => {
  const [newBooksInfo, setNewBooksInfo] = useState([]);

  useEffect(() => {
    setNewBooksInfo([]);
    newBooks.forEach((el) => {
      getBookInfo(el);
    });
  }, [newBooks]);

  const getBookInfo = (isbn) => {
    axios
      .get(`/api/books/${isbn}`)
      .then((res) => {
        setNewBooksInfo([...newBooksInfo, res.data.data]);
      })
      .catch((error) => {
        console.error(error);
      });
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
              cover={el.cover}
            />
          );
        })}
      </Books>
    </NewBooksContainer>
  );
};

export default NewBooks;
