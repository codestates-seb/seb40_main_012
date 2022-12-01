import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GenterMatcherToKor } from '../../util/GenreMatcher';

const MainBookContainer = styled.div`
  position: relative;
  &.dark {
    background: linear-gradient(
      white 55%,
      ${({ theme }) => theme.colors.darkgray} 45%
    );
  }
  &.light {
    background: linear-gradient(
      white 55%,
      ${({ theme }) => theme.colors.purple_1} 45%
    );
  }

  height: 400px;
  img {
    height: 95%;
    aspect-ratio: 7 / 10;
    object-fit: cover;
    margin-left: 10px;
    @media screen and (max-width: 980px) {
      margin-right: 10px;
    }
    @media screen and (max-width: 640px) {
      width: 40%;
      height: auto;
      margin: 0 10px 0 0;
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
  @media screen and (max-width: 500px) {
    margin: 5px;
    height: 250px;
  }
`;

const MainBookInfo = styled.div`
  width: 50%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0px;
  background-color: transparent;
  position: relative;
  .title {
    font-size: 28px;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.dark};
    margin-bottom: 10px;
    word-wrap: break-all;
    overflow: hidden;
    line-height: 1.5;
    max-height: 3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .author {
    font-size: 16px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.mainColor};
    margin-bottom: 10px;
    overflow: hidden;
    line-height: 1.5;
    max-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .genre {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.darkgray};
    margin-bottom: 20%;
    overflow: hidden;
    line-height: 1.5;
    max-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .rating {
    font-size: 24px;
    font-weight: 700;
    display: flex;
    align-items: flex-end;
    margin-bottom: 15px;
    img {
      width: 30px;
      height: 30px;
      margin-bottom: 5px;
    }
    .info {
      font-size: 18px;
      white-space: nowrap;
    }
  }
  .comments {
    div.bookcomment {
      display: flex;
      align-items: center;
      font-size: 13px;
      img {
        object-fit: contain;
        margin: 0 5px 0 0;
      }
      .content {
        overflow: hidden;
        line-height: 1.5;
        max-height: 1.5;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
  }
  @media screen and (max-width: 640px) {
    padding: 10px;
    .title {
      font-size: 18px;
    }
    .author,
    .genre {
      font-size: 12px;
    }
    .rating {
      font-size: 18px;
      img {
        width: 20px;
        height: 20px;
        margin: 0 3px 5px 5px;
      }
      .info {
        font-size: 14px;
      }
    }
    .comments {
      img {
        width: 13px;
        height: 13px;
      }
    }
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    .title {
      font-size: 14px;
    }
    .author {
      font-size: 11px;
    }
    .genre {
      font-size: 10px;
    }
    .rating {
      font-size: 14px;
      img {
        width: 15px;
        height: 15px;
      }
      .info {
        font-size: 11px;
      }
    }
    .comments {
      & .content {
        font-size: 10px;
      }
    }
  }
`;

const RateInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60%;
  &.dark {
    .rating {
      color: ${({ theme }) => theme.colors.purple_1};
      .info {
        color: #f5f5f5;
      }
    }
    .comments {
      div.bookcomment {
        color: #f5f5f5;
      }
    }
  }
  &.light {
    .rating {
      color: ${({ theme }) => theme.colors.darkgray};
      .info {
        color: ${({ theme }) => theme.colors.darkgray};
      }
    }
    .comments {
      div.bookcomment {
        color: ${({ theme }) => theme.colors.darkgray};
      }
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
  comments,
}) => {
  const navigate = useNavigate();

  const onClickMainBook = () => {
    navigate(`/book/${isbn}`);
  };
  return (
    <MainBookContainer className={ranking % 2 === 0 ? 'light' : 'dark'}>
      <RankInfo>{ranking}</RankInfo>
      <img
        src={cover}
        alt="book cover"
        onClick={onClickMainBook}
        role="presentation"
      />
      <MainBookInfo>
        <div className="title">
          {bookTitle.length >= 80 ? `${bookTitle.slice(0, 76)}...` : bookTitle}
        </div>
        <div className="author">
          {author.length >= 50 ? `${author.slice(0, 47)}...` : author}
        </div>
        <div className="genre">{`${publish} · ${GenterMatcherToKor(
          genre
        )}`}</div>
        <RateInfoContainer className={ranking % 2 === 0 ? 'light' : 'dark'}>
          <div className="rating">
            <span className="info">체리픽 유저들의 평가 </span>
            {ranking % 2 === 0 ? (
              <img
                src={process.env.PUBLIC_URL + '/images/star_dark.svg'}
                alt="star"
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + '/images/star_purple.svg'}
                alt="star"
              />
            )}
            {rating}
          </div>
          <div className="comments">
            {comments?.slice(0, 2).map((el, idx) => {
              return (
                <div key={idx} className="bookcomment">
                  {ranking % 2 === 0 ? (
                    <img
                      src={process.env.PUBLIC_URL + '/images/comment_dark.svg'}
                      alt="comment"
                    />
                  ) : (
                    <img
                      src={
                        process.env.PUBLIC_URL + '/images/comment_purple.svg'
                      }
                      alt="comment"
                    />
                  )}
                  <div className="content">{el.body}</div>
                </div>
              );
            })}
          </div>
        </RateInfoContainer>
      </MainBookInfo>
    </MainBookContainer>
  );
};

export default MainBook;
