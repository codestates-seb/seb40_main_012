import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';
import { useNavigate } from 'react-router-dom';

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
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const OtherPhotoContents = styled.div`
  width: 100%;
  height: 140px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.purple_2};
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LineContents = styled.div`
  width: 100%;
  height: 50px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.purple_3};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PairingCuration = ({ title, pairingData }) => {
  const navigate = useNavigate();
  const onClickPairing = (pairingId) => {
    navigate(`/pairing/${pairingId}`);
  };
  let sortingArr;
  if (pairingData.length !== 0) {
    sortingArr = [...pairingData].sort(function (a, b) {
      return b.likeCount - a.likeCount;
    });
  }
  console.log(sortingArr);
  return (
    <ThemeProvider theme={theme}>
      <h1>{title}</h1>
      <PairingCurationWrapper>
        <PhotoContainer>
          <FirstPhotoContents
            onClick={() => onClickPairing(sortingArr[0].pairingId)}
          >
            <h1>{sortingArr && sortingArr[0].title}</h1>
          </FirstPhotoContents>
          <SecondContainer>
            <OtherPhotoContents
              onClick={() => onClickPairing(sortingArr[1].pairingId)}
            >
              <h1>{sortingArr && sortingArr[1].title}</h1>
            </OtherPhotoContents>
            <OtherPhotoContents
              onClick={() => onClickPairing(sortingArr[2].pairingId)}
            >
              <h1>{sortingArr && sortingArr[2].title}</h1>
            </OtherPhotoContents>
          </SecondContainer>
        </PhotoContainer>
        <ColumnContainer>
          <LineContents onClick={() => onClickPairing(sortingArr[3].pairingId)}>
            <h1>{sortingArr && sortingArr[3].title}</h1>
          </LineContents>
          <LineContents onClick={() => onClickPairing(sortingArr[4].pairingId)}>
            <h1>{sortingArr && sortingArr[4].title}</h1>
          </LineContents>
          <LineContents onClick={() => onClickPairing(sortingArr[5].pairingId)}>
            <h1>{sortingArr && sortingArr[5].title}</h1>
          </LineContents>
          <LineContents onClick={() => onClickPairing(sortingArr[6].pairingId)}>
            <h1>{sortingArr && sortingArr[6].title}</h1>
          </LineContents>
          <LineContents onClick={() => onClickPairing(sortingArr[7].pairingId)}>
            <h1>{sortingArr && sortingArr[7].title}</h1>
          </LineContents>
        </ColumnContainer>
      </PairingCurationWrapper>
    </ThemeProvider>
  );
};

export default PairingCuration;
