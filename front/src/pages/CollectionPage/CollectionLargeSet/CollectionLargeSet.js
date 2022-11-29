import axios from '../../../api/axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import CollectionSetTitle from '../CollectionSetTitle';
import CollectionLargeBooks from './CollectionLargeBooks';

const CollectionLargeSetContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  padding: 0 40px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 640px) {
    padding: 0 20px;
  }
  @media screen and (max-width: 500px) {
    padding: 0;
  }
`;

const CollectionLargeSet = ({ type }) => {
  const navigate = useNavigate();
  const GetURL =
    type === 'author' ? '/api/collections/author' : '/api/collections/critic';

  const [data, setData] = useState({
    title: '',
    books: [],
  });

  useEffect(() => {
    axios
      .get(`${GetURL}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const onClickCollection = () => {
    navigate(`/collection/${data.collectionId}`);
  };
  return (
    <CollectionLargeSetContainer onClick={onClickCollection}>
      <CollectionSetTitle title={data.title}></CollectionSetTitle>
      <CollectionLargeBooks books={data.books} />
    </CollectionLargeSetContainer>
  );
};

export default CollectionLargeSet;
