import styled from 'styled-components';
import CollectionDetailBook from './CollectionDetailBook';

const CollectionDetailBooksContainer = styled.div`
  padding: 25px 20px;
`;

const CollectionBooksTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 700;
  padding-bottom: 10px;
`;

const BooksContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

const CollectionDetailBooks = () => {
  return (
    <CollectionDetailBooksContainer>
      <CollectionBooksTitle>책</CollectionBooksTitle>
      <BooksContainer>
        <CollectionDetailBook
          bookTitle="책 제목하하하하하하하하핳하하하하하하하하"
          rating="4.3"
          bookId="1"
        />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
        <CollectionDetailBook bookTitle="책 제목" rating="4.3" bookId="1" />
      </BooksContainer>
    </CollectionDetailBooksContainer>
  );
};

export default CollectionDetailBooks;
