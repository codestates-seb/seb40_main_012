import styled from 'styled-components';
import BestCollection from './BestCollection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../components/CarouselArrows';
import MainBooksTitle from './MainBooksTitle';
import { useEffect, useState } from 'react';
import axios from '../../api/axios';

const BestCollectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-bottom: 80px;
  @media screen and (max-width: 640px) {
    padding: 0 20px;
    margin-bottom: 60px;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    margin-bottom: 40px;
  }
`;

const BestCollectionCarousel = styled.div`
  width: 100%;
  //기본 arrow 삭제
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-next {
    right: 22px;
    top: 47%;
    @media screen and (max-width: 500px) {
      display: none !important;
    }
  }
  .slick-prev {
    left: 22px;
    top: 47%;
    z-index: 100;
    @media screen and (max-width: 500px) {
      display: none !important;
    }
  }
`;

const BestCollections = () => {
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
    axios
      .get('/api/collections/bestCollection')
      .then((res) => {
        setData([...res.data.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <BestCollectionsContainer>
      <MainBooksTitle title="체리픽 인기 컬렉션" type="collection" />
      <BestCollectionCarousel>
        <Slider {...settings}>
          {data?.map((el) => {
            return (
              <BestCollection
                key={el.collectionId}
                title={el.title}
                collectionId={el.collectionId}
                books={el.books}
              />
            );
          })}
        </Slider>
      </BestCollectionCarousel>
    </BestCollectionsContainer>
  );
};

export default BestCollections;
