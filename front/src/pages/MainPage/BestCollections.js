import styled from 'styled-components';
import BestCollection from './BestCollection';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../components/CarouselArrows';
import MainBooksTitle from './MainBooksTitle';

const BestCollectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 40px;
  margin-bottom: 40px;
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
    right: 20px;
    top: 47%;
  }
  .slick-prev {
    left: 22px;
    top: 47%;
    z-index: 100;
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

  return (
    <BestCollectionsContainer>
      <MainBooksTitle title="요즘 뜨는 컬렉션" />
      <BestCollectionCarousel>
        <Slider {...settings}>
          <BestCollection title="컬렉션1" collectionId="1" />
          <BestCollection title="컬렉션2" collectionId="2" />
          <BestCollection title="컬렉션3" collectionId="3" />
          <BestCollection title="컬렉션4" collectionId="4" />
          <BestCollection title="컬렉션5" collectionId="5" />
          <BestCollection title="컬렉션6" collectionId="6" />
          <BestCollection title="컬렉션7" collectionId="7" />
          <BestCollection title="컬렉션8" collectionId="8" />
        </Slider>
      </BestCollectionCarousel>
    </BestCollectionsContainer>
  );
};

export default BestCollections;
