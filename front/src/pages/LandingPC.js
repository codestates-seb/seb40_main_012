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
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const LandingPC = () => {
  const slides = [
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/ad87dd24-34d4-4d7c-a96f-9a0e06321a9a/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/7d4d69c8-852e-4ded-a668-3d696a6b2e4f/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/91580814-e83c-4e10-991e-977ffd18ebe7/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/3728b4b1-0134-4ade-ac79-4b22c9712522/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/a4c5e274-99f1-4912-b4ac-b1d3a0dbea55/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/e5bcce8a-1f5d-4e1d-91ff-e826cb2024cf/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/a681c25f-9080-408a-90b9-e83cd14b8442/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/970719eb-b058-4d19-8903-fddb4f55450c/image.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://velog.velcdn.com/images/chichi_/post/8b6f357a-5e3f-4086-b684-2ba32bf7dd2f/image.png")',
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

export default LandingPC;
