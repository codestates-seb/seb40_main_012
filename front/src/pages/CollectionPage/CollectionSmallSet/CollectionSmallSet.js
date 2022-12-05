import styled from 'styled-components';
import CollectionSetTitle from '../CollectionSetTitle';
import CollectionSmallBooks from './CollectionSmallBooks';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../../components/CarouselArrows';
import { useSelector } from 'react-redux';
import { selectIsLogin } from '../../../store/modules/authSlice';
import { useEffect, useState } from 'react';
import axios from '../../../api/axios';

const SlickSlider = styled.div`
  width: 100%;
  //기본 arrow 삭제
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-next {
    right: 20px;
    top: 47%;
    @media screen and (max-width: 1100px) {
      top: 40%;
    }
    @media screen and (max-width: 500px) {
      display: none !important;
    }
  }
  .slick-prev {
    left: 22px;
    top: 47%;
    z-index: 100;
    @media screen and (max-width: 1100px) {
      top: 40%;
    }
    @media screen and (max-width: 500px) {
      display: none !important;
    }
  }
`;

const CollectionSmallSetContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
  padding: 0 40px;
  @media screen and (max-width: 640px) {
    padding: 0 20px;
    margin-bottom: 60px;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    margin-bottom: 40px;
  }
`;

const CollectionBooks = styled.div`
  display: flex;
  justify-content: center;
`;

const BooksContainer = styled.div`
  width: 100%;
  display: flex;
`;

const NoCollectionContainer = styled.div`
  border: 1px dashed ${({ theme }) => theme.colors.mainColor};
  width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .info {
    text-align: center;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.darkgray};
    margin-bottom: 10px;
  }
  @media screen and (max-width: 640px) {
    height: 100px;
    .img > img {
      width: 25px;
      height: 25px;
    }
    .info {
      font-size: 13px;
    }
  }
  @media screen and (max-width: 500px) {
    height: 80px;
    .info {
      font-size: 10px;
      margin-bottom: 0;
    }
  }
`;

const CollectionSmallSet = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    if (isLogin) {
      //내 컬렉션 조회
      axios
        .get('/api/collections/userCollection')
        .then((res) => {
          setData([...res.data.data]);
        })
        .catch((error) => console.error(error));
    } else {
      //인기 컬렉션 조회
      axios
        .get('/api/collections/bestCollection')
        .then((res) => {
          setData([...res.data.data]);
        })
        .catch((error) => console.error(error));
    }
  }, []);

  const isLogin = useSelector(selectIsLogin);

  return (
    <CollectionSmallSetContainer>
      {isLogin ? (
        <>
          <CollectionSetTitle
            title="나의 컬렉션"
            isMyCollection={true}
            isLogin={isLogin}
          />
          {data.length === 0 ? (
            <NoCollectionContainer>
              <div className="img">
                <img
                  src={process.env.PUBLIC_URL + '/images/collection_icon.svg'}
                  alt="collection"
                />
              </div>
              <div className="info">
                컬렉션이 존재하지 않습니다.
                <br />
                나만의 컬렉션을 만들어보세요!
              </div>
            </NoCollectionContainer>
          ) : (
            <>
              {data.length >= 4 ? (
                <CollectionBooks>
                  <SlickSlider>
                    <Slider {...settings}>
                      {data?.map((el) => {
                        return (
                          <CollectionSmallBooks
                            key={el.collectionId}
                            collectionId={el.collectionId}
                            title={el.title}
                            books={el.books}
                            len={data.length}
                          />
                        );
                      })}
                    </Slider>
                  </SlickSlider>
                </CollectionBooks>
              ) : (
                <BooksContainer>
                  {data?.map((el) => {
                    return (
                      <CollectionSmallBooks
                        key={el.collectionId}
                        collectionId={el.collectionId}
                        title={el.title}
                        books={el.books}
                        type="small"
                        len={data.length}
                      />
                    );
                  })}
                </BooksContainer>
              )}
            </>
          )}
        </>
      ) : (
        <>
          <CollectionSetTitle
            title="체리픽 인기 컬렉션"
            isMyCollection={true}
          />
          <CollectionBooks>
            <SlickSlider>
              <Slider {...settings}>
                {data?.map((el) => {
                  return (
                    <CollectionSmallBooks
                      key={el.collectionId}
                      collectionId={el.collectionId}
                      title={el.title}
                      books={el.books}
                    />
                  );
                })}
              </Slider>
            </SlickSlider>
          </CollectionBooks>
        </>
      )}
    </CollectionSmallSetContainer>
  );
};

export default CollectionSmallSet;
