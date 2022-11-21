import { useState } from 'react';
import PageContainer from '../../components/PageContainer';
import CollectionInfoInput from './CollectionInfoInput';

const CollectionWritePage = () => {
  const [data, setData] = useState({
    title: '',
    tags: ['태그1', '태그2'],
    content: '',
    bookIsbns: [],
  });

  return (
    <PageContainer footer>
      <CollectionInfoInput data={data} setData={setData}></CollectionInfoInput>
    </PageContainer>
  );
};

export default CollectionWritePage;
