import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import MainBook from './MainBook';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainBooksContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 25px 0;
  min-width: 500px;
`;

const MainCarousel = styled.div`
  width: 95%;
  padding: 30px 0;
`;

const MainBooks = () => {
  const settings = {
    infinite: true,
    centerMode: true,
    speed: 500,
    slidesToShow: 1,
    dots: true,
  };
  return (
    <ThemeProvider theme={theme}>
      <MainBooksContainer>
        <MainCarousel>
          <Slider {...settings}>
            <MainBook
              bookTitle="책 제목1"
              author="저자"
              publish="출판사"
              genre="소설"
              rating="4.8"
            />
            <MainBook
              bookTitle="책 제목2하하하하하하하하하하하하핳하"
              author="저자"
              publish="출판사"
              genre="소설"
              rating="4.8"
            />
            <MainBook
              bookTitle="책 제목3"
              author="저자"
              publish="출판사"
              genre="소설"
              rating="4.8"
            />
            <MainBook
              bookTitle="책 제목4"
              author="저자"
              publish="출판사"
              genre="소설"
              rating="4.8"
            />
            <MainBook
              bookTitle="책 제목5"
              author="저자"
              publish="출판사"
              genre="소설"
              rating="4.8"
            />
            <MainBook
              bookTitle="책 제목6"
              author="저자"
              publish="출판사"
              genre="소설"
              rating="4.8"
            />
          </Slider>
        </MainCarousel>
      </MainBooksContainer>
    </ThemeProvider>
  );
};

export default MainBooks;
