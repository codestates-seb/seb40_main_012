import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GenterMatcherToKor } from '../../util/GenreMatcher';

const randomColor = () => {
  return Math.floor(Math.random() * 50) + 200;
};

const MainBookContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.bgcolor};
  border-radius: 20px;
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
  &:hover {
    cursor: pointer;
  }
`;

const MainBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 30px;
  background-color: #f5f5f5;
  min-width: 120px;
  border-radius: 10px;
  padding: 20px;

  .title {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 5px;
    word-wrap: break-word;
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

const RankInfo = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 25px;
  height: 25px;
  padding-top: 2px;
  background-color: ${({ theme }) => theme.colors.darkgray};
  color: white;
  text-align: center;
  font-weight: 700;
  font-size: 15px;
`;

const MainBook = ({
  ranking,
  bookId,
  bookTitle,
  author,
  publish,
  genre,
  rating,
  cover,
}) => {
  const randomRGB = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`;

  const navigate = useNavigate();

  const onClickMainBook = () => {
    navigate(`/book/${bookId}`);
  };

  return (
    <MainBookContainer bgcolor={randomRGB} onClick={onClickMainBook}>
      <RankInfo>{ranking}</RankInfo>
      <img src={cover} alt="book cover" />
      <MainBookInfo>
        <div className="title">{bookTitle}</div>
        <div className="author">{`${author} ·${publish}`}</div>
        <div className="genre">{GenterMatcherToKor(genre)}</div>
        <div className="rating">★ {rating}</div>
      </MainBookInfo>
    </MainBookContainer>
  );
};

export default MainBook;
