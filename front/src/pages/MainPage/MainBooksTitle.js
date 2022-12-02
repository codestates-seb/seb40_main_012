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
  @media screen and (min-width: 641px) {
    &.best {
      margin-top: 5px;
    }
  }
`;

const MainBooksTitle = ({ title, type }) => {
  return (
    <MainBooksTitleContainer className={type}>
      {title}
      {type ? <Guide type={type} /> : null}
    </MainBooksTitleContainer>
  );
};

export default MainBooksTitle;
