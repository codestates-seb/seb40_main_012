import styled from 'styled-components';
import Guide from './Guide';

const MainBooksTitleContainer = styled.div`
  width: 100%;
  margin: 50px 0 20px 0;
  display: flex;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
  @media screen and (max-width: 640px) {
    font-size: 18px;
  }
`;

const MainBooksTitle = ({ title, type }) => {
  return (
    <MainBooksTitleContainer>
      {title}
      {type ? <Guide type={type} /> : null}
    </MainBooksTitleContainer>
  );
};

export default MainBooksTitle;
