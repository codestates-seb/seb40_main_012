import axios from 'axios';
import { useEffect } from 'react';

const OauthTestPage = () => {
  useEffect(() => {
    const path = location.pathname;
    const code = location.search;
    console.log(code);
    axios.get(`http://localhost:8080${path}${code}`);
  }, []);
  return (
    <div>
      <h1>Oauth 로그인 테스트페이지입니다</h1>
    </div>
  );
};

export default OauthTestPage;
