import styled from 'styled-components';

const NewBookContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 17%;
  margin: 1.5%;
  position: relative;
  &.search:hover {
    cursor: pointer;
  }
`;

const CoverContainer = styled.div`
  img {
    width: 100% !important;
    height: 100% !important;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    image-rendering: -webkit-optimize-contrast;
    backface-visibility: hidden;
    transform: translateZ(0);
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
  search = false,
  handleDeleteBook,
  handleSetNewBooks,
}) => {
  const deleteBook = () => {
    if (remove) {
      handleDeleteBook(isbn);
    }
  };
  return (
    <>
      {search ? (
        <NewBookContainer
          className="search"
          onClick={() => {
            handleSetNewBooks(isbn);
          }}
        >
          <CoverContainer>
            <img src={cover} alt="book cover" />
          </CoverContainer>
          <TitleContainer>{title}</TitleContainer>
          <AuthorContainer>{author}</AuthorContainer>
        </NewBookContainer>
      ) : (
        <NewBookContainer>
          <DeleteBtn onClick={deleteBook}>X</DeleteBtn>
          <CoverContainer>
            <img src={cover} alt="book cover" />
          </CoverContainer>
          <TitleContainer>{title}</TitleContainer>
          <AuthorContainer>{author}</AuthorContainer>
        </NewBookContainer>
      )}
    </>
  );
};

export default NewBook;
