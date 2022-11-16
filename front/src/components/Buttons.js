import styled, { ThemeProvider } from 'styled-components';
import theme from '../styles/theme';
import { useState } from 'react';

const BasicBtn = styled.button`
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

const LikeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-weight: bold;
  border: none;
  width: 60px;
  height: 30px;
  svg {
    margin-right: 3px;
  }
`;

export const LikeButton = ({ children }) => {
  const [isLike, setIsLike] = useState(false);
  const handleLike = () => {
    setIsLike(!isLike);
  };
  return (
    <ThemeProvider theme={theme}>
      <LikeBtn onClick={handleLike}>
        {isLike ? (
          <svg
            width="23"
            height="19"
            viewBox="0 0 23 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5342 3.92381C21.2069 3.16609 20.7351 2.47945 20.145 1.90233C19.5545 1.32349 18.8583 0.86349 18.0942 0.54735C17.3019 0.218231 16.4522 0.0497698 15.5942 0.0517445C14.3906 0.0517445 13.2163 0.381334 12.1958 1.00389C11.9517 1.15282 11.7197 1.31639 11.5 1.49462C11.2803 1.31639 11.0483 1.15282 10.8042 1.00389C9.78369 0.381334 8.60937 0.0517445 7.40576 0.0517445C6.53906 0.0517445 5.69922 0.21776 4.90576 0.54735C4.13916 0.864733 3.44824 1.32128 2.85498 1.90233C2.26415 2.4788 1.79218 3.1656 1.46582 3.92381C1.12646 4.71239 0.953125 5.54979 0.953125 6.41161C0.953125 7.2246 1.11914 8.07176 1.44873 8.93358C1.72461 9.65379 2.12012 10.4009 2.62549 11.1553C3.42627 12.3491 4.52734 13.5942 5.89453 14.8564C8.16016 16.9487 10.4038 18.394 10.499 18.4526L11.0776 18.8237C11.334 18.9873 11.6636 18.9873 11.9199 18.8237L12.4985 18.4526C12.5938 18.3916 14.835 16.9487 17.103 14.8564C18.4702 13.5942 19.5713 12.3491 20.3721 11.1553C20.8774 10.4009 21.2754 9.65379 21.5488 8.93358C21.8784 8.07176 22.0444 7.2246 22.0444 6.41161C22.0469 5.54979 21.8735 4.71239 21.5342 3.92381V3.92381Z"
              fill="#232627"
            />
          </svg>
        ) : (
          <svg
            width="23"
            height="19"
            viewBox="0 0 23 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.5342 3.92381C21.2069 3.16609 20.7351 2.47945 20.145 1.90233C19.5545 1.32349 18.8583 0.86349 18.0942 0.54735C17.3019 0.218231 16.4522 0.0497698 15.5942 0.0517445C14.3906 0.0517445 13.2163 0.381334 12.1958 1.00389C11.9517 1.15282 11.7197 1.31639 11.5 1.49462C11.2803 1.31639 11.0483 1.15282 10.8042 1.00389C9.78369 0.381334 8.60937 0.0517445 7.40576 0.0517445C6.53906 0.0517445 5.69922 0.21776 4.90576 0.54735C4.13916 0.864733 3.44824 1.32128 2.85498 1.90233C2.26415 2.4788 1.79218 3.1656 1.46582 3.92381C1.12646 4.71239 0.953125 5.54979 0.953125 6.41161C0.953125 7.2246 1.11914 8.07176 1.44873 8.93358C1.72461 9.65379 2.12012 10.4009 2.62549 11.1553C3.42627 12.3491 4.52734 13.5942 5.89453 14.8564C8.16016 16.9487 10.4038 18.394 10.499 18.4526L11.0776 18.8237C11.334 18.9873 11.6636 18.9873 11.9199 18.8237L12.4985 18.4526C12.5938 18.3916 14.835 16.9487 17.103 14.8564C18.4702 13.5942 19.5713 12.3491 20.3721 11.1553C20.8774 10.4009 21.2754 9.65379 21.5488 8.93358C21.8784 8.07176 22.0444 7.2246 22.0444 6.41161C22.0469 5.54979 21.8735 4.71239 21.5342 3.92381V3.92381ZM11.5 16.8926C11.5 16.8926 2.80859 11.3237 2.80859 6.41161C2.80859 3.92381 4.8667 1.90721 7.40576 1.90721C9.19043 1.90721 10.7383 2.90331 11.5 4.35838C12.2617 2.90331 13.8096 1.90721 15.5942 1.90721C18.1333 1.90721 20.1914 3.92381 20.1914 6.41161C20.1914 11.3237 11.5 16.8926 11.5 16.8926Z"
              fill="#232627"
            />
          </svg>
        )}
        {children}
      </LikeBtn>
    </ThemeProvider>
  );
};

const PickBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-weight: bold;
  border: none;
  width: 90px;
  height: 30px;
  svg {
    margin-right: 3px;
  }
`;

export const PickButton = ({ children }) => {
  const [isPick, setIsPick] = useState(false);
  const handlePick = () => {
    setIsPick(!isPick);
  };
  return (
    <ThemeProvider theme={theme}>
      <PickBtn onClick={handlePick}>
        {isPick ? (
          <svg
            width="19"
            height="25"
            viewBox="0 0 19 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.125 3.125V24.2188C0.124901 24.3544 0.160132 24.4878 0.227226 24.6057C0.29432 24.7236 0.390963 24.822 0.507643 24.8912C0.624323 24.9605 0.757017 24.9981 0.892664 25.0005C1.02831 25.0028 1.16223 24.9698 1.28125 24.9047L9.5 20.4203L17.7188 24.9047C17.8378 24.9698 17.9717 25.0028 18.1073 25.0005C18.243 24.9981 18.3757 24.9605 18.4924 24.8912C18.609 24.822 18.7057 24.7236 18.7728 24.6057C18.8399 24.4878 18.8751 24.3544 18.875 24.2188V3.125C18.875 2.2962 18.5458 1.50134 17.9597 0.915291C17.3737 0.32924 16.5788 0 15.75 0L3.25 0C2.4212 0 1.62634 0.32924 1.04029 0.915291C0.45424 1.50134 0.125 2.2962 0.125 3.125V3.125Z"
              fill="#232627"
            />
          </svg>
        ) : (
          <svg
            width="19"
            height="25"
            viewBox="0 0 19 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.125 3.125C0.125 2.2962 0.45424 1.50134 1.04029 0.915291C1.62634 0.32924 2.4212 0 3.25 0L15.75 0C16.5788 0 17.3737 0.32924 17.9597 0.915291C18.5458 1.50134 18.875 2.2962 18.875 3.125V24.2188C18.8749 24.3601 18.8365 24.4987 18.7639 24.6199C18.6912 24.7411 18.5871 24.8404 18.4625 24.9071C18.3379 24.9738 18.1976 25.0055 18.0564 24.9987C17.9153 24.992 17.7786 24.947 17.6609 24.8688L9.5 20.4703L1.33906 24.8688C1.22141 24.947 1.08473 24.992 0.94358 24.9987C0.802426 25.0055 0.662083 24.9738 0.537499 24.9071C0.412915 24.8404 0.308756 24.7411 0.236116 24.6199C0.163475 24.4987 0.125073 24.3601 0.125 24.2188V3.125ZM3.25 1.5625C2.8356 1.5625 2.43817 1.72712 2.14515 2.02015C1.85212 2.31317 1.6875 2.7106 1.6875 3.125V22.7594L9.06719 18.8812C9.19541 18.7959 9.34599 18.7504 9.5 18.7504C9.65401 18.7504 9.80459 18.7959 9.93281 18.8812L17.3125 22.7594V3.125C17.3125 2.7106 17.1479 2.31317 16.8549 2.02015C16.5618 1.72712 16.1644 1.5625 15.75 1.5625H3.25Z"
              fill="#232627"
            />
          </svg>
        )}
        {children}
      </PickBtn>
    </ThemeProvider>
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
