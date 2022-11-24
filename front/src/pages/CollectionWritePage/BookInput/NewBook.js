import styled from 'styled-components';

const NewBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  margin: 1.5%;
  &:hover {
    cursor: pointer;
  }
  position: relative;
`;

const CoverContainer = styled.div`
  img {
    width: 100%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
  }
`;

const TitleContainer = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.dark};
`;

const AuthorContainer = styled.div`
  font-size: 11px;
  color: ${({ theme }) => theme.colors.dark};
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
`;

const NewBook = ({
  title,
  author,
  cover,
  isbn,
  remove = false,
  handleDeleteBook,
}) => {
  const deleteBook = () => {
    if (remove) {
      handleDeleteBook(isbn);
    }
  };
  return (
    <NewBookContainer onClick={deleteBook}>
      {remove ? <DeleteBtn>x</DeleteBtn> : null}
      <CoverContainer>
        <img src={cover} alt="book cover" />
      </CoverContainer>
      <TitleContainer>{title}</TitleContainer>
      <AuthorContainer>{author}</AuthorContainer>
    </NewBookContainer>
  );
};

export default NewBook;
