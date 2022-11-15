import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

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
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const OtherPhotoContents = styled.div`
  width: 100%;
  height: 140px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.purple_2};
  border-radius: 25px;
`;

const LineContents = styled.div`
  width: 100%;
  height: 50px;
  margin: 5px;
  background-color: ${({ theme }) => theme.colors.purple_3};
  border-radius: 15px;
`;

const PairingCuration = ({ title }) => {
  return (
    <ThemeProvider theme={theme}>
      <h1>{title}</h1>
      <PairingCurationWrapper>
        <PhotoContainer>
          <FirstPhotoContents>
            <h2>이건 제목입니다</h2>
          </FirstPhotoContents>
          <SecondContainer>
            <OtherPhotoContents></OtherPhotoContents>
            <OtherPhotoContents></OtherPhotoContents>
          </SecondContainer>
        </PhotoContainer>
        <ColumnContainer>
          <LineContents></LineContents>
          <LineContents></LineContents>
          <LineContents></LineContents>
          <LineContents></LineContents>
          <LineContents></LineContents>
        </ColumnContainer>
      </PairingCurationWrapper>
    </ThemeProvider>
  );
};

export default PairingCuration;
