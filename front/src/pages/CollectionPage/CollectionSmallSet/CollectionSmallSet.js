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
      right: 5px;
      top: 50%;
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
      left: 5px;
      top: 50%;
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

  const response = {
    listCount: 4,
    data: [
      {
        collectionId: 53,
        content: 'ㅇㅇㅇㅇ',
        title: '기획 컨텐츠2',
        collectionLike: 0,
        books: [
          {
            isbn13: '9788998441012',
            title: '모순 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
          },
        ],
      },
      {
        collectionId: 54,
        content: 'ㅇㅇㅇㅇ',
        title: '기획 컨텐츠2',
        collectionLike: 0,
        books: [
          {
            isbn13: '9788998441012',
            title: '모순 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
          },
          {
            isbn13: '9788965880783',
            title:
              '원미동 시인 「양귀자」 - 원미동 시인, 비 오는 날이면 가리봉동에 가야 한다, 한계령',
            author: '양귀자 (지은이), 김양선 (엮은이), 이경하 (그림)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/1522/60/cover/8965880785_1.jpg',
          },
          {
            isbn13: '9788998441074',
            title: '나는 소망한다 내게 금지된 것을',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/18936/52/cover/8998441071_1.jpg',
          },
          {
            isbn13: '9788998441005',
            title: '원미동 사람들',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2187/40/cover/8998441004_2.jpg',
          },
          {
            isbn13: '9788998441029',
            title: '천년의 사랑 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2585/74/cover/8998441020_1.jpg',
          },
          {
            isbn13: '9788998441043',
            title: '슬픔도 힘이 된다 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/4877/74/cover/8998441047_1.jpg',
          },
        ],
      },
      {
        collectionId: 55,
        content: 'ㅇㅇㅇㅇ',
        title: '기획 컨텐츠2',
        collectionLike: 0,
        books: [
          {
            isbn13: '9788998441012',
            title: '모순 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
          },
          {
            isbn13: '9788965880783',
            title:
              '원미동 시인 「양귀자」 - 원미동 시인, 비 오는 날이면 가리봉동에 가야 한다, 한계령',
            author: '양귀자 (지은이), 김양선 (엮은이), 이경하 (그림)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/1522/60/cover/8965880785_1.jpg',
          },
          {
            isbn13: '9788998441074',
            title: '나는 소망한다 내게 금지된 것을',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/18936/52/cover/8998441071_1.jpg',
          },
          {
            isbn13: '9788998441005',
            title: '원미동 사람들',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2187/40/cover/8998441004_2.jpg',
          },
          {
            isbn13: '9788998441029',
            title: '천년의 사랑 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2585/74/cover/8998441020_1.jpg',
          },
          {
            isbn13: '9788998441043',
            title: '슬픔도 힘이 된다 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/4877/74/cover/8998441047_1.jpg',
          },
        ],
      },
      {
        collectionId: 56,
        content: 'ㅇㅇㅇㅇ',
        title: '기획 컨텐츠2',
        collectionLike: 0,
        books: [
          {
            isbn13: '9788998441012',
            title: '모순 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
          },
          {
            isbn13: '9788965880783',
            title:
              '원미동 시인 「양귀자」 - 원미동 시인, 비 오는 날이면 가리봉동에 가야 한다, 한계령',
            author: '양귀자 (지은이), 김양선 (엮은이), 이경하 (그림)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/1522/60/cover/8965880785_1.jpg',
          },
          {
            isbn13: '9788998441074',
            title: '나는 소망한다 내게 금지된 것을',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/18936/52/cover/8998441071_1.jpg',
          },
          {
            isbn13: '9788998441005',
            title: '원미동 사람들',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2187/40/cover/8998441004_2.jpg',
          },
          {
            isbn13: '9788998441029',
            title: '천년의 사랑 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/2585/74/cover/8998441020_1.jpg',
          },
          {
            isbn13: '9788998441043',
            title: '슬픔도 힘이 된다 - 개정판',
            author: '양귀자 (지은이)',
            ratingCount: 0,
            bookCover:
              'https://image.aladin.co.kr/product/4877/74/cover/8998441047_1.jpg',
          },
        ],
      },
    ],
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
      //인기 컬렉션 조회 -> api 수정 필요
      // axios
      //   .get('/api/collections/userCollection')
      //   .then((res) => {
      //     console.log(res.data.data);
      //     setData(res.data.data);
      //   })
      //   .catch((error) => console.error(error));
      setData(response.data);
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
                  />
                );
              })}
            </BooksContainer>
          )}
        </>
      ) : (
        <>
          <CollectionSetTitle title="요즘 뜨는 컬렉션" isMyCollection={true} />
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
