import { PageContainer } from 'containers';
import PairingTab from './PairingComponents/PairingTab';
import PairingCherryPick from './PairingComponents/PairingCherryPick';
import PairingCuration from './PairingComponents/PairingCuration';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import {
  asyncGetAllPairingLike,
  asyncGetAllPairingNewest,
  asyncGetAllPairingRandom,
} from '../../store/modules/allPairingSlice';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../components/CarouselArrows';

const SlickSlider = styled.div`
  width: 100%;
  //기본 arrow 삭제
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
  .slick-next {
    right: 0px;
    top: 47%;
  }
  .slick-prev {
    left: 0px;
    top: 47%;
    z-index: 100;
  }
`;

const PairingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncGetAllPairingLike());
    dispatch(asyncGetAllPairingNewest());
    dispatch(asyncGetAllPairingRandom());
  }, [dispatch]);

  const settings = {
    infinite: true,
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

  const pairingLikeData = useSelector((state) => state.allPairing.likeData);
  const pairingNewestData = useSelector((state) => state.allPairing.newestData);
  const pairingRandomData = useSelector((state) => state.allPairing.randomData);
  const titleLike = '수많은 체리들의 선택, Hot Pairing';
  const titleNewest = '따끈따끈한 New Pairing';
  const titleRandom = '운명적인 Random Pairing';
  return (
    <PageContainer footer>
      <PairingTab />
      <SlickSlider>
        <Slider {...settings}>
          <PairingCherryPick
            img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FE2Let%2FbtrSHvnEktD%2FW1gIdYDKXQ2N57w75pQgDk%2Fimg.jpg"
            pairingId="4"
          >
            <div>
              세상을 홀로 견디는 기분.
              <br />
              우주도, 지구도, 서울도 똑같은 마음으로 여행중인 당신을 위해.
            </div>
          </PairingCherryPick>
          <PairingCherryPick
            img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FlJj5W%2FbtrSJypKbXg%2FidiZNLtp4UfMvKCTjcZAV0%2Fimg.jpg"
            pairingId="97"
          >
            <div>
              배추 꽃봉오리 파스타
              <br />
              책을 읽고 영화를 보면 무조건 먹어보고 싶은 그 요리!
            </div>
          </PairingCherryPick>
          <PairingCherryPick
            img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2F80o0S%2FbtrSI8SMN6u%2FTYXRpMdwHyv1vsEfexuZk0%2Fimg.jpg"
            pairingId="9"
          >
            <div>
              듣고 있으면 사막에 와있는 것 같은 느낌
              <br />
              원작을 읽으며 듣는다면 훨씬 몰입할 수 있을 것
            </div>
          </PairingCherryPick>
          <PairingCherryPick
            img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fbuxv4w%2FbtrSJn3p6bF%2FyEzkXf5dr3Tkfk3JQc6HvK%2Fimg.jpg"
            pairingId="79"
          >
            <div>
              한 쪽은 다이빙을 잘 해서 다이빙의 왕이 되고,
              <br />한 쪽은 물까지 가는데 오랜 결심이 필요하고.
            </div>
          </PairingCherryPick>
          <PairingCherryPick
            img="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fcn6aSw%2FbtrSLJqXE2l%2FD2NcTDiAdRsYKD6qPk6zC0%2Fimg.jpg"
            pairingId="110"
          >
            <div>
              우주를 물리의 시선에서 바라보았다면
              <br />
              이번엔 생명의 시선에서 바라보는 건 어떠세요?
            </div>
          </PairingCherryPick>
        </Slider>
      </SlickSlider>
      <PairingCuration title={titleLike} pairingData={pairingLikeData} />
      <PairingCuration title={titleNewest} pairingData={pairingNewestData} />
      <PairingCuration title={titleRandom} pairingData={pairingRandomData} />
    </PageContainer>
  );
};

export default PairingPage;
