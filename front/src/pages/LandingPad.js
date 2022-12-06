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
  margin-top: -43px;
  @media screen and (max-width: 410px) {
    display: none;
  }
`;

const LandingPad = () => {
  const slides = [
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/d57783a3-0518-4758-a5f8-de5b196cf866/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/046e20d7-bc18-4a84-a8e5-49014f086115/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/7409c46c-d663-4a18-b467-c7cc0a9980b9/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/6a0000e9-ab99-4911-b14e-06cbc65f031f/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/188efafc-fa13-4f39-876f-1e2ab4b48ea6/image.png")',
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

export default LandingPad;
