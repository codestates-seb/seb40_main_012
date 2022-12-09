import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewBooks from './NewBooks';
import MyBooks from './MyBooks';
import BookSearch from './BookSearch';

const CollectionBookInputContainer = styled.div`
  background-color: #f5f5f5;
  padding: 0 60px 30px;
  @media screen and (max-width: 980px) {
    padding: 20px 40px;
  }
  @media screen and (max-width: 640px) {
    padding: 20px 20px;
  }
  @media screen and (max-width: 500px) {
    padding: 5px 10px;
  }
`;

const CollectionBookInput = ({ data, setData }) => {
  //isbn13 값으로 관리
  const [newBooks, setNewBooks] = useState([]);
  const [newBooksInfo, setNewBooksInfo] = useState([]);

  useEffect(() => {
    setData({ ...data, bookIsbns: newBooks });
  }, [newBooks]);

  return (
    <CollectionBookInputContainer>
      <MyBooks
        newBooks={newBooks}
        setNewBooks={setNewBooks}
        newBooksInfo={newBooksInfo}
        setNewBooksInfo={setNewBooksInfo}
      />
      <BookSearch
        newBooks={newBooks}
        setNewBooks={setNewBooks}
        newBooksInfo={newBooksInfo}
        setNewBooksInfo={setNewBooksInfo}
      />
      <NewBooks
        newBooks={newBooks}
        setNewBooks={setNewBooks}
        newBooksInfo={newBooksInfo}
        setNewBooksInfo={setNewBooksInfo}
      />
    </CollectionBookInputContainer>
  );
};

export default CollectionBookInput;
