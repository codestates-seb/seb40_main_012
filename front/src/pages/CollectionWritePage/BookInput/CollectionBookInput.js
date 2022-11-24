import { useEffect, useState } from 'react';
import styled from 'styled-components';
import NewBooks from './NewBooks';
import MyBooks from './MyBooks';
import BookSearch from './BookSearch';

const CollectionBookInputContainer = styled.div`
  background-color: #f5f5f5;
  padding: 0 60px 30px;
`;

const CollectionBookInput = ({ data, setData }) => {
  //isbn13 값으로 관리
  const [newBooks, setNewBooks] = useState([]);

  useEffect(() => {
    setData({ ...data, bookIsbns: newBooks });
  }, [newBooks]);

  return (
    <CollectionBookInputContainer>
      <MyBooks newBooks={newBooks} setNewBooks={setNewBooks} />
      <BookSearch newBooks={newBooks} setNewBooks={setNewBooks} />
      <NewBooks newBooks={newBooks} setNewBooks={setNewBooks} />
    </CollectionBookInputContainer>
  );
};

export default CollectionBookInput;
