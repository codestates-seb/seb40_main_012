import styled from 'styled-components';

const NewBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  margin: 1.5%;
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
  @media screen and (max-width: 640px) {
    display: none;
  }
`;

const DeleteBtn = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;
  background-color: ${({ theme }) => theme.colors.lightgray};
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 700;
  border: none;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
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
      {remove ? <DeleteBtn>X</DeleteBtn> : null}
      <CoverContainer>
        <img src={cover} alt="book cover" />
      </CoverContainer>
      <TitleContainer>{title}</TitleContainer>
      <AuthorContainer>{author}</AuthorContainer>
    </NewBookContainer>
  );
};

export default NewBook;
