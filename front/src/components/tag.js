import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';

const TagContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.purple_1};
  border-radius: 15px;
  padding: 4px 12px;
  margin-right: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkgray};
  white-space: nowrap;
`;

export const Tag = ({ children, width, height, fontSize, fontWeight }) => {
  return (
    <ThemeProvider theme={theme}>
      <TagContainer
        width={width}
        height={height}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {children}
      </TagContainer>
    </ThemeProvider>
  );
};
