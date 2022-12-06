import styled from 'styled-components';
import {
  // ISlideConfig,
  PageSlides,
  SlideParallaxType,
} from '@re_point/react-page-slides';

const Container = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  .rps-slide-background {
    background-size: 100% !important;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .image {
    width: 100vw;
  }
`;

const MainContainer = styled.div`
  background-color: rgb(107 83 187);
`;

const LandingMobile = () => {
  const slides = [
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/b4b32370-a249-4eb8-803e-5a8f8a945ca8/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/3cd1ffd9-5416-43c1-8223-5c23654701ed/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/4e20f509-ca4d-4a42-a645-488241194d48/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/53196dfc-b929-43d5-b6ee-7c4503f1a579/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/6fd9da2f-8851-481d-b94a-66b1a88e1eb5/image.png")',
      },
    },
  ];

  return (
    <MainContainer>
      <Container>
        <PageSlides
          enableAutoScroll={true}
          transitionSpeed={1200}
          slides={slides}
          parallax={{
            offset: 0.6,
            type: SlideParallaxType.reveal,
          }}
        ></PageSlides>
      </Container>
    </MainContainer>
  );
};

export default LandingMobile;
