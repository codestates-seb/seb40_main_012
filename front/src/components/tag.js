import styled from 'styled-components';

const TagContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.purple_1};
  border-radius: 15px;
  padding: 4px 12px;
  margin-right: 6px;
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.darkgray};
  white-space: nowrap;
  @media screen and (max-width: 500px) {
    font-size: 8px;
    padding: 2px 8px;
  }
`;

export const Tag = ({ children, width, height, fontSize, fontWeight }) => {
  return (
    <TagContainer
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </TagContainer>
  );
};
