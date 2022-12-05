import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 20px;
  .CurationTitle {
    margin: 5px;
    font-size: 18px;
    font-weight: bold;
  }
  cursor: pointer;
`;

const PairingCurationWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 981px) {
    //981px ~
    flex-direction: row;
  }
`;
const PhotoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 641px) {
    //641 ~ 980px
    flex-direction: row;
  }
`;

const SecondContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  @media screen and (min-width: 641px) {
    //641 ~ 980px
    flex-direction: column;
  }
`;

const ColumnContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5px;
`;

const FirstPhotoContents = styled.div`
  width: 100%;
  height: 300px;
  margin: 5px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const OtherPhotoContents = styled.div`
  width: 100%;
  height: 145px;
  margin: 5px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const LineContents = styled.div`
  width: 100%;
  height: 52px;
  margin: 5px;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  background-color: ${(props) => props.color || 'rgba(0,0,0,0.5)'};
  background-blend-mode: multiply;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: white;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const PairingCuration = ({ title, pairingData }) => {
  const navigate = useNavigate();
  const twoToThree = pairingData.slice(1, 3);
  const fourToEight = pairingData.slice(3, 8);
  const onClickPairing = (pairingId) => {
    navigate(`/pairing/${pairingId}`);
  };
  return (
    <Wrapper>
      <h1 className="CurationTitle">{title}</h1>
      <PairingCurationWrapper>
        <PhotoContainer>
          <FirstPhotoContents
            img={pairingData[0]?.imagePath}
            color={pairingData[0]?.imagePath ? null : '#A28BFF'}
            onClick={() => onClickPairing(pairingData[0]?.pairingId)}
          >
            <h1>{pairingData[0]?.title}</h1>
          </FirstPhotoContents>
          <SecondContainer>
            {twoToThree?.map((el) => {
              return (
                <OtherPhotoContents
                  key={el.pairingId}
                  img={el.imagePath}
                  color={el.imagePath ? null : '#A28BFF'}
                  onClick={() => onClickPairing(el.pairingId)}
                >
                  <h1>{el?.title}</h1>
                </OtherPhotoContents>
              );
            })}
          </SecondContainer>
        </PhotoContainer>
        <ColumnContainer>
          {fourToEight?.map((el) => {
            return (
              <LineContents
                key={el.pairingId}
                img={el.imagePath}
                color={el.imagePath ? null : '#A28BFF'}
                onClick={() => onClickPairing(el.pairingId)}
              >
                <h1>{el?.title}</h1>
              </LineContents>
            );
          })}
        </ColumnContainer>
      </PairingCurationWrapper>
    </Wrapper>
  );
};

export default PairingCuration;
