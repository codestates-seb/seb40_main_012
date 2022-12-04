import styled from 'styled-components';
import MyBooks from 'pages/CollectionWritePage/BookInput/MyBooks';
import BookSearch from 'pages/CollectionWritePage/BookInput/BookSearch';
import NewBooks from 'pages/CollectionWritePage/BookInput/NewBooks';

const CollectionEditBookInputContainer = styled.div`
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

const CollectionEditBookInput = ({
  newBooks,
  newBooksInfo,
  handleEditNewBooks,
  handleEditNewBooksInfo,
}) => {
  return (
    <CollectionEditBookInputContainer>
      <MyBooks
        newBooks={newBooks}
        setNewBooks={handleEditNewBooks}
        newBooksInfo={newBooksInfo}
        setNewBooksInfo={handleEditNewBooksInfo}
      />
      <BookSearch
        newBooks={newBooks}
        setNewBooks={handleEditNewBooks}
        newBooksInfo={newBooksInfo}
        setNewBooksInfo={handleEditNewBooksInfo}
      />
      <NewBooks
        newBooks={newBooks}
        setNewBooks={handleEditNewBooks}
        newBooksInfo={newBooksInfo}
        setNewBooksInfo={handleEditNewBooksInfo}
      />
    </CollectionEditBookInputContainer>
  );
};

export default CollectionEditBookInput;
