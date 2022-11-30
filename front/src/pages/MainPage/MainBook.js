import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GenterMatcherToKor } from '../../util/GenreMatcher';

const randomColor = () => {
  return Math.floor(Math.random() * 50) + 200;
};

const MainBookContainer = styled.div`
  position: relative;
  background-color: ${(props) => props.bgcolor};
  height: 400px;
  img {
    height: 90%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    margin-left: 10px;
    @media screen and (max-width: 640px) {
      width: 40%;
      height: auto;
      margin-left: 0;
    }
    &:hover {
      cursor: pointer;
    }
  }
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 30px;
  @media screen and (max-width: 640px) {
    margin: 5px;
    height: 350px;
  }
`;

const MainBookInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0px;
  background-color: #f5f5f5;
  min-width: 120px;
  border-radius: 5px;
  padding: 20px;
  .title {
    font-size: 22px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 5px;
    word-wrap: break-all;
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
    font-weight: 600;
  }
  @media screen and (max-width: 640px) {
    .title {
      font-size: 16px;
    }
    .author,
    .genre {
      font-size: 12px;
    }
    .rating {
      font-size: 14px;
    }
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
  isbn,
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
    navigate(`/book/${isbn}`);
  };

  return (
    <MainBookContainer bgcolor={randomRGB}>
      <RankInfo>{ranking}</RankInfo>
      <img
        src={cover}
        alt="book cover"
        onClick={onClickMainBook}
        role="presentation"
      />
      <MainBookInfo>
        <div className="title">{bookTitle}</div>
        <div className="author">{`${author} · ${publish}`}</div>
        <div className="genre">{GenterMatcherToKor(genre)}</div>
        <div className="rating">★ {rating}</div>
      </MainBookInfo>
    </MainBookContainer>
  );
};

export default MainBook;
