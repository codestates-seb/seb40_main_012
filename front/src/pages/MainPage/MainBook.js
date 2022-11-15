import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';

const randomColor = () => {
  return Math.floor(Math.random() * 20) + 220;
};

const MainBookContainer = styled.div`
  background-color: ${(props) => props.bgcolor};
  border-radius: 30px;
  height: 400px;
  img {
    height: 90%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    margin-left: 20px;
    @media screen and (max-width: 640px) {
      width: 30%;
      height: auto;
    }
  }
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
`;

const MainBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 30px;
  background-color: #f5f5f5;
  min-width: 120px;
  border-radius: 20px;
  padding: 20px;

  .title {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 5px;
    @media screen and (max-width: 640px) {
      font-size: 18px;
    }
  }
  .author {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.darkgray};
    margin-bottom: 5px;
  }
  .genre {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.darkgray};
    margin-bottom: 5px;
  }
  .rating {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;

const MainBook = ({ bookTitle, author, publish, genre, rating }) => {
  const randomRGB = `rgb(${randomColor()}, ${randomColor()}, 255)`;
  return (
    <ThemeProvider theme={theme}>
      <MainBookContainer bgcolor={randomRGB}>
        <img
          src={process.env.PUBLIC_URL + '/images/books/bookcover_1.jpeg'}
          alt="book cover"
        />
        <MainBookInfo>
          <div className="title">{bookTitle}</div>
          <div className="author">{`${author} ·${publish}`}</div>
          <div className="genre">{genre}</div>
          <div className="rating">★ {rating}</div>
        </MainBookInfo>
      </MainBookContainer>
    </ThemeProvider>
  );
};

export default MainBook;
