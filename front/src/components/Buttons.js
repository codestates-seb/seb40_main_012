import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { useState } from 'react';

const BasicBtn = styled.button`
  margin: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.mainColor};
  border: 2px solid ${({ theme }) => theme.colors.mainColor};
  border-radius: ${(props) => props.borderRadius || '25px'};
  width: ${(props) => props.width || '120px'};
  height: ${(props) => props.height || '40px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_1};
    border: none;
    color: white;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.mainColor};
    border: none;
    color: white;
  }
`;
export const BasicButton = ({
  children,
  width,
  height,
  borderRadius,
  fontSize,
  fontWeight,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <BasicBtn
        width={width}
        height={height}
        borderRadius={borderRadius}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {children}
      </BasicBtn>
    </ThemeProvider>
  );
};

const FillBtn = styled.button`
  margin: 10px;
  background-color: #bfbfbf;
  color: white;
  border: none;
  border-radius: ${(props) => props.borderRadius || '20px'};
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '40px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_1};
    color: white;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
`;
export const FillButton = ({
  children,
  width,
  height,
  borderRadius,
  fontSize,
  fontWeight,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <FillBtn
        width={width}
        height={height}
        borderRadius={borderRadius}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {children}
      </FillBtn>
    </ThemeProvider>
  );
};

const LikeBtnWrapper = styled.div`
  .like {
    background-color: ${({ theme }) => theme.colors.purple_1};
    color: white;
  }
`;
const LikeBtn = styled.button`
  margin: 10px;

  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.purple_1};
  width: 80px;
  height: 30px;
  border-radius: 25px;
  &:active {
    background-color: ${({ theme }) => theme.colors.purple_1};
  }
`;

export const LikeButton = ({ children }) => {
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <ThemeProvider theme={theme}>
      <LikeBtnWrapper>
        <LikeBtn onClick={handleLike} className={isLike ? 'like' : ''}>
          {children}
        </LikeBtn>
      </LikeBtnWrapper>
    </ThemeProvider>
  );
};

const TransparBtn = styled.button`
  margin: 10px;
  background-color: transparent;
  color: ${(props) => props.color || '${({ theme }) => theme.colors.purple_1}'};
  border: none;
  border-radius: ${(props) => props.borderRadius || '25px'};
  width: ${(props) => props.width || '120px'};
  height: ${(props) => props.height || '40px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_1};
    color: white;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: white;
  }
`;

export const TransparButton = ({
  children,
  color,
  width,
  height,
  borderRadius,
  fontSize,
  fontWeight,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <TransparBtn
        color={color}
        width={width}
        height={height}
        borderRadius={borderRadius}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {children}
      </TransparBtn>
    </ThemeProvider>
  );
};

const MoreBtn = styled.button`
  margin: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray};
  border: none;
  width: ${(props) => props.width || '70px'};
  height: ${(props) => props.height || '20px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  &:hover {
    color: ${({ theme }) => theme.colors.dark};
  }
  &:active {
    color: ${({ theme }) => theme.colors.mainColor};
  }
`;
export const MoreButton = ({
  children,
  width,
  height,
  fontSize,
  fontWeight,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <MoreBtn
        width={width}
        height={height}
        fontSize={fontSize}
        fontWeight={fontWeight}
      >
        {children}
      </MoreBtn>
    </ThemeProvider>
  );
};
