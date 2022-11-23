import { useEffect, useState } from 'react';
import PageContainer from '../../components/PageContainer';
import CollectionInfoInput from './CollectionInfoInput';
import CollectionWriteBtns from './CollectionWriteBtns';
import CollectionBookInput from './BookInput/CollectionBookInput';
import styled from 'styled-components';

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

  useEffect(() => {
    if (data.title !== '') setIsFilled(true);
    else setIsFilled(false);
  }, [data]);

  const handleCollectionWrite = () => {
    if (isFilled) {
      console.log('컬렉션 작성 post');
    }
  };

  return (
    <PageContainer footer>
      <CollectionWritePageContainer>
        <div className="content">
          <CollectionInfoInput
            data={data}
            setData={setData}
          ></CollectionInfoInput>
          <CollectionBookInput data={data} setData={setData} />
        </div>
        <CollectionWriteBtns handleCollectionWrite={handleCollectionWrite} />
      </CollectionWritePageContainer>
    </PageContainer>
  );
};

export default CollectionWritePage;
