import styled, { ThemeProvider } from 'styled-components';
import theme from '../../../styles/theme';

const CollectionTagsContainer = styled.div`
  display: flex;
`;

const CollectionTag = styled.div`
  font-size: 14px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.darkgray};
  margin: 0 3px;
  white-space: nowrap;
`;

const CollectionTags = ({ tagList }) => {
  return (
    <ThemeProvider theme={theme}>
      <CollectionTagsContainer>
        {tagList.map((tag, idx) => {
          return <CollectionTag key={idx}>#{tag}</CollectionTag>;
        })}
      </CollectionTagsContainer>
    </ThemeProvider>
  );
};

export default CollectionTags;
