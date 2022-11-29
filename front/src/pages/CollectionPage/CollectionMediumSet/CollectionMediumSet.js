import { useEffect, useState } from 'react';
import styled from 'styled-components';
import CollectionSetTitle from '../CollectionSetTitle';
import CollectonMediumBooks from './CollectionMediumBooks';
import axios from '../../../api/axios';

const CollectionMediumSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 80px;
  padding: 0 40px;
  @media screen and (max-width: 640px) {
    padding: 0 20px;
    margin-bottom: 60px;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
    margin-bottom: 40px;
  }
`;

const CollectionBooks = styled.div`
  display: flex;
`;

const CollectionMediumSet = ({ title, nickName, type }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    //TODO: URL 조건부로 수정!
    // const URL =
    //   type === 'recomment'
    //     ? '/api/collections/category'
    //     : '/api/collections/tag';

    const URL = '/api/collections/tag';

    axios
      .get(URL)
      .then((res) => {
        setData([...res.data.data]);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <CollectionMediumSetContainer>
      <CollectionSetTitle title={title} type={type} nickName={nickName} />
      <CollectionBooks>
        <CollectonMediumBooks collection={data[0]} />
        <CollectonMediumBooks collection={data[1]} />
      </CollectionBooks>
    </CollectionMediumSetContainer>
  );
};

export default CollectionMediumSet;
