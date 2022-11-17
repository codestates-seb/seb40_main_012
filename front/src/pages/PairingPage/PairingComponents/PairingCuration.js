import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
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
  background-color: ${({ theme }) => theme.colors.purple_2};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const OtherPhotoContents = styled.div`
  width: 100%;
  height: 145px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.purple_2};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const LineContents = styled.div`
  width: 100%;
  height: 52px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.purple_3};
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &:hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

const PairingCuration = ({ title, pairingData }) => {
  const navigate = useNavigate();
  const onClickPairing = (pairingId) => {
    navigate(`/pairing/${pairingId}`);
  };
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <h1 className="CurationTitle">{title}</h1>
        <PairingCurationWrapper>
          <PhotoContainer>
            <FirstPhotoContents
              onClick={() => onClickPairing(pairingData[0].pairingId)}
            >
              <h1>{pairingData[0] && pairingData[0].title}</h1>
            </FirstPhotoContents>
            <SecondContainer>
              <OtherPhotoContents
                onClick={() => onClickPairing(pairingData[1].pairingId)}
              >
                <h1>{pairingData[1] && pairingData[1].title}</h1>
              </OtherPhotoContents>
              <OtherPhotoContents
                onClick={() => onClickPairing(pairingData[2].pairingId)}
              >
                <h1>{pairingData[2] && pairingData[2].title}</h1>
              </OtherPhotoContents>
            </SecondContainer>
          </PhotoContainer>
          <ColumnContainer>
            <LineContents
              onClick={() => onClickPairing(pairingData[3].pairingId)}
            >
              <h1>{pairingData[3] && pairingData[3].title}</h1>
            </LineContents>
            <LineContents
              onClick={() => onClickPairing(pairingData[4].pairingId)}
            >
              <h1>{pairingData[4] && pairingData[4].title}</h1>
            </LineContents>
            <LineContents
              onClick={() => onClickPairing(pairingData[5].pairingId)}
            >
              <h1>{pairingData[5] && pairingData[5].title}</h1>
            </LineContents>
            <LineContents
              onClick={() => onClickPairing(pairingData[6].pairingId)}
            >
              <h1>{pairingData[6] && pairingData[6].title}</h1>
            </LineContents>
            <LineContents
              onClick={() => onClickPairing(pairingData[7].pairingId)}
            >
              <h1>{pairingData[7] && pairingData[7].title}</h1>
            </LineContents>
          </ColumnContainer>
        </PairingCurationWrapper>
      </Wrapper>
    </ThemeProvider>
  );
};

export default PairingCuration;
