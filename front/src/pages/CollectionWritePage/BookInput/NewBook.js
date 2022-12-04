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
  @media screen and (max-width: 500px) {
    width: 20%;
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
    border: 1px solid transparent;
  }
  &.search:hover {
    img {
      border: 1px solid ${({ theme }) => theme.colors.mainColor};
    }
  }
`;

const TitleContainer = styled.div`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.dark};
  margin-top: 5px;
  @media screen and (max-width: 500px) {
    font-size: 7px;
  }
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
  z-index: 100;
  &:hover {
    cursor: pointer;
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
  @media screen and (max-width: 500px) {
    width: 12px;
    height: 12px;
    font-size: 10px;
    padding-right: 2px;
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
          <CoverContainer className={search ? 'search' : null}>
            <img src={cover} alt="book cover" />
          </CoverContainer>
          <TitleContainer>{title}</TitleContainer>
          <AuthorContainer>{author}</AuthorContainer>
        </NewBookContainer>
      ) : (
        <NewBookContainer>
          <DeleteBtn onClick={deleteBook}>x</DeleteBtn>
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
