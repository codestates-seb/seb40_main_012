import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from 'containers';
import CollectionInfoInput from './CollectionInfoInput';
import CollectionWriteBtns from './CollectionWriteBtns';
import CollectionBookInput from './BookInput/CollectionBookInput';
import styled from 'styled-components';
import axios from '../../api/axios';

const CollectionWritePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  .content {
    display: flex;
    flex-direction: column;
  }
`;

const CollectionWritePage = () => {
  const [data, setData] = useState({
    title: '',
    tags: [],
    content: '',
    bookIsbns: [],
  });
  const [isFilled, setIsFilled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.title !== '' && data.bookIsbns.length !== 0) setIsFilled(true);
    else setIsFilled(false);
  }, [data]);

  const handleCollectionWrite = () => {
    if (isFilled) {
      axios
        .post('/api/collections/new', {
          ...data,
        })
        .then((res) => {
          console.log(res.data);
          navigate(`/collection/${res.data.collectionId}`);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <PageContainer footer>
      <CollectionWritePageContainer>
        <div className="content">
          <CollectionInfoInput data={data} setData={setData} />
          <CollectionBookInput data={data} setData={setData} />
        </div>
        <CollectionWriteBtns
          handleCollectionWrite={handleCollectionWrite}
          isFilled={isFilled}
        />
      </CollectionWritePageContainer>
    </PageContainer>
  );
};

export default CollectionWritePage;
