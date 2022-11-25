import styled from 'styled-components';

const MainBooksTitleContainer = styled.div`
  width: 100%;
  margin: 50px 0 20px 0;
  display: flex;
  font-size: 24px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.dark};
`;

const MainBooksTitle = ({ title }) => {
  return <MainBooksTitleContainer>{title}</MainBooksTitleContainer>;
};

export default MainBooksTitle;
