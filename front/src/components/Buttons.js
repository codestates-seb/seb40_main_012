import { useState } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import { theme } from 'styles';

const BasicBtn = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.mainColor};
  border: 2px solid ${({ theme }) => theme.colors.mainColor};
  border-radius: ${(props) => props.borderRadius || '25px'};
  width: ${(props) => props.width || '120px'};
  height: ${(props) => props.height || '40px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  white-space: nowrap;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_1};
    border: none;
    color: white;
    cursor: pointer;
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
  onClick,
}) => {
  return (
    <BasicBtn
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontSize={fontSize}
      fontWeight={fontWeight}
      onClick={onClick}
    >
      {children}
    </BasicBtn>
  );
};

const FillBtn = styled.button`
  background-color: #bfbfbf;
  color: white;
  border: none;
  border-radius: ${(props) => props.borderRadius || '20px'};
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '40px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  white-space: nowrap;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_1};
    color: white;
    cursor: pointer;
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
  onClick,
}) => {
  return (
    <FillBtn
      onClick={onClick}
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </FillBtn>
  );
};

const LikeBtnWrapper = styled.div`
  .like {
    background-color: ${({ theme }) => theme.colors.purple_1};
    color: white;
  }
`;
const LikeBtn = styled.button`
  background-color: transparent;
  border: 1px solid ${({ theme }) => theme.colors.purple_1};
  width: 80px;
  height: 30px;
  border-radius: 25px;
  &:active {
    background-color: ${({ theme }) => theme.colors.purple_1};
  }
  &:hover {
    cursor: pointer;
  }
`;

export const LikeButton = ({ children }) => {
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <LikeBtnWrapper>
      <LikeBtn onClick={handleLike} className={isLike ? 'like' : ''}>
        {children}
      </LikeBtn>
    </LikeBtnWrapper>
  );
};

const TransparBtn = styled.button`
  background-color: transparent;
  color: ${(props) => props.color || '${({ theme }) => theme.colors.purple_1}'};
  border: none;
  border-radius: ${(props) => props.borderRadius || '25px'};
  width: ${(props) => props.width || '120px'};
  height: ${(props) => props.height || '40px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  white-space: nowrap;
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
  onClick,
}) => {
  return (
    <TransparBtn
      onClick={onClick}
      color={color}
      width={width}
      height={height}
      borderRadius={borderRadius}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </TransparBtn>
  );
};

const MoreBtn = styled.button`
  background-color: transparent;
  color: ${({ theme }) => theme.colors.gray};
  border: none;
  width: ${(props) => props.width || '70px'};
  height: ${(props) => props.height || '20px'};
  font-size: ${(props) => props.fontSize || '14px'};
  font-weight: ${(props) => props.fontWeight || '700'};
  white-space: nowrap;
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
  onClick,
}) => {
  return (
    <MoreBtn
      onClick={onClick}
      width={width}
      height={height}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </MoreBtn>
  );
};

const InitButton = styled(Button)`
  border-radius: ${(props) => props.borderRadius || '20px'};
  width: ${(props) => props.width};
  white-space: nowrap;
`;

export const ContainedButton = styled(InitButton)`
  background-color: ${({ disabled }) =>
    disabled ? 'rgba(0, 0, 0, 0.12)' : theme.colors.mainColor};
  color: ${({ disabled }) => (disabled ? 'rgba(0, 0, 0, 0.26)' : '#fff')};
  box-shadow: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_1};
    box-shadow: none;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.mainColor};
    box-shadow: none;
  }
`;

export const TextButton = styled(InitButton)`
  background-color: transparent;
  color: ${({ disabled }) =>
    disabled ? 'rgba(0, 0, 0, 0.26)' : theme.colors.mainColor};
  box-shadow: none;
  &:hover {
    background-color: ${({ theme }) => theme.colors.purple_1};
    color: #fff;
    box-shadow: none;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: #fff;
    box-shadow: none;
  }
`;

export const OutlinedButton = styled(TextButton)`
  border: 2px solid
    ${({ disabled }) =>
      disabled ? 'rgba(0, 0, 0, 0.26)' : theme.colors.mainColor};
  box-shadow: none;
  &:hover {
    border-color: ${({ theme }) => theme.colors.purple_1};
    background-color: ${({ theme }) => theme.colors.purple_1};
    color: #fff;
    box-shadow: none;
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.mainColor};
    color: #fff;
    box-shadow: none;
  }
`;

export const MoveBorderButton = styled.button`
  outline: none;
  display: inline-block;
  margin: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;

  :after {
    display: block;
    content: '';
    border-bottom: solid 3px #6741ff;
    transform: scaleX(0);
    transition: transform 250ms ease-in-out;
    text-decoration: none;
  }
  :hover:after {
    transform: scaleX(1);
  }
  .fromRight:after {
    transform-origin: 100% 50%;
  }
  .fromLeft:after {
    transform-origin: 0% 50%;
  }
`;

export const FixedBorderButton = styled.button`
  outline: none;
  display: inline-block;
  margin: 0;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
  display: block;
  content: '';
  border-bottom: solid 3px #6741ff;
  align-items: center;
`;
