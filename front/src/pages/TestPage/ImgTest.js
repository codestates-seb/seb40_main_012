import { useState } from 'react';
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
  const [imgData, setImgData] = useState({});

  const onChangeImg = async (e) => {
    e.preventDefault();

    if (e.target.files) {
      const uploadFile = e.target.files[0];
      setImgData(uploadFile);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', imgData);

    await axios.post('/api/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  };
  return (
    <Div>
      <div>
        <input id="upload" type="file" onChange={onChangeImg} />
        <button onClick={handleSubmit}>제출</button>
      </div>
    </Div>
  );
};

export default ImgTest;
