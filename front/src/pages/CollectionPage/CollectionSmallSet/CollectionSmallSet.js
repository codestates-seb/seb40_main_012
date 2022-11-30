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
          <CollectionSetTitle title="나의 컬렉션" isMyCollection={true} />
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
