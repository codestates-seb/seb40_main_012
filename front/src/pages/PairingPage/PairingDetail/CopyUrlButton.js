import { useState, useEffect } from 'react';
import styled from 'styled-components';

const Btns = styled.button`
  display: flex;
  align-items: center;
  padding: 3px 7px;
  border: none;
  border-radius: 3px;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.darkgray};
  font-size: 15px;
  font-weight: 500;
  img {
    width: 20px;
    height: 20px;
    margin-right: 2px;
  }
  &:hover {
    cursor: pointer;
    background-color: #e8e8e8;
  }
`;

const Toast = styled.div`
  position: absolute;
  margin-top: 3px;
  padding: 3px 5px;
  border-radius: 3px;
  color: gray;
  background-color: rgba(200, 200, 200, 0.5);
  animation: fadeout 3s;
  @keyframes fadeout {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

const CopyUrlButton = () => {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setToast(false);
    }, 5000);
  });
  const copyUrl = () => {
    const curUrl = window.location.href;
    navigator.clipboard.writeText(curUrl);
    setToast(true);
  };
  return (
    <div>
      <Btns onClick={copyUrl}>
        <img
          src={process.env.PUBLIC_URL + '/images/share_icon.svg'}
          alt="share icon"
        />
        <span>공유하기</span>
      </Btns>
      {toast ? <Toast>복사되었습니다</Toast> : null}
    </div>
  );
};

export default CopyUrlButton;
