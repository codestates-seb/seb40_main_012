import axios from 'axios';
import { useEffect } from 'react';

const OauthTestPage = () => {
  useEffect(() => {
    const path = location.pathname;
    const code = location.search;
    console.log('get 요청주소', `http://localhost:8080${path}${code}`);
    axios.get(`http://localhost:8080${path}${code}`).then(() => {
      console.log('성공', `http://localhost:8080${path}${code}`).catch(() => {
        console.log('실패', `http://localhost:8080${path}${code}`);
      });
    });
  }, []);
  return (
    <div>
      <h1>Oauth 로그인 테스트페이지입니다</h1>
    </div>
  );
};

export default OauthTestPage;
