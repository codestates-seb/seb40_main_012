// import { useState } from 'react';
import styled from 'styled-components';
import axios from '../../api/axios';

const Div = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px;
  width: 300px;
  border: 1px solid black;
  h1 {
    margin: 10px 0px;
  }
`;

const ImgTest = () => {
  const handleImageUpload = (event) => {
    event.preventDefault();
    const file = event.currentTarget['fileInput'].files[0];
    console.log('과연', file);

    const res = axios.post('/api/images/upload', file);
    console.log(res);
  };
  return (
    <Div>
      <form onSubmit={handleImageUpload} encType="multipart/form-data">
        <input id="fileInput" type="file" />
        <button>제출</button>
      </form>
    </Div>
  );
};

export default ImgTest;
