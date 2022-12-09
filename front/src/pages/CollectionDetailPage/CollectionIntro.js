import styled from 'styled-components';

const CollectionIntroContainer = styled.div`
  padding: 25px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.lightgray};
  @media screen and (max-width: 640px) {
    padding: 15px 10px;
  }
  @media screen and (max-width: 500px) {
    padding: 10px 5px;
  }
`;

const CollectionIntroTitle = styled.div`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 700;
  padding-bottom: 10px;
  @media screen and (max-width: 500px) {
    font-size: 16px;
  }
`;
const CollectionIntroContent = styled.div`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.darkgray};
  @media screen and (max-width: 500px) {
    font-size: 11px;
  }
`;
const CollectionIntro = ({ intro }) => {
  return (
    <CollectionIntroContainer>
      <CollectionIntroTitle>컬렉션 소개</CollectionIntroTitle>
      <CollectionIntroContent>{intro}</CollectionIntroContent>
    </CollectionIntroContainer>
  );
};

export default CollectionIntro;
