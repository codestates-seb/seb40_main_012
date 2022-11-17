import { useEffect, useState } from 'react';
import axios from '../../api/axios';
import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import MainBook from './MainBook';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../components/CarouselArrows';

const MainBooksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
  min-width: 650px;
`;

const MainCarousel = styled.div`
  width: 95%;
  padding: 30px 0;
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

const MainBooks = () => {
  const [mainBooks, setMainBooks] = useState([]);

  useEffect(() => {
    axios
      .get('/api/books/carousel')
      .then((response) => {
        setMainBooks(response.data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const settings = {
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    dots: true,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <ThemeProvider theme={theme}>
      <MainBooksContainer>
        <MainCarousel>
          <Slider {...settings}>
            {mainBooks.map((el) => {
              return (
                <MainBook
                  key={el.bookId}
                  bookTitle={el.title}
                  author={el.author}
                  publish="출판사"
                  genre={el.genre}
                  rating={el.averageRating}
                />
              );
            })}
          </Slider>
        </MainCarousel>
      </MainBooksContainer>
    </ThemeProvider>
  );
};

export default MainBooks;
