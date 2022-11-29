import styled from 'styled-components';
import { PageContainer } from 'containers';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CollectionInfoInput from 'pages/CollectionWritePage/CollectionInfoInput';
import CollectionEditBookInput from './EditBookInput/CollectionEditBookInput';
import CollectionWriteBtns from 'pages/CollectionWritePage/CollectionWriteBtns';
import axios from '../../api/axios';

const CollectionEditPageContainer = styled.div``;

const CollectionEditPage = () => {
  const { collectionId } = useParams();
  const [data, setData] = useState({
    title: '',
    tags: [],
    content: '',
    bookIsbns: [],
    bookInfos: [],
  });
  const [newBooks, setNewBooks] = useState([]);
  const [newBooksInfo, setNewBooksInfo] = useState([]);
  const [isFilled, setIsFilled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data.title !== '' && newBooks.length !== 0) setIsFilled(true);
    else setIsFilled(false);
  }, [data, newBooks]);

  useEffect(() => {
    axios
      .get(`/api/collections/${collectionId}`)
      .then((res) => {
        setData({
          ...data,
          title: res.data.title,
          tags: res.data.tags,
          content: res.data.content,
        });
        setNewBooks(res.data.books.map((el) => el.isbn13));
        setNewBooksInfo(res.data.books);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleCollectionEdit = () => {
    if (isFilled) {
      const body = {
        title: data.title,
        content: data.content,
        tags: data.tags,
        bookIsbns: newBooks,
      };
      axios
        .patch(`/api/collections/edit/${collectionId}`, {
          ...body,
        })
        .then(() => {
          navigate(`/collection/${collectionId}`);
        })
        .catch((error) => console.error(error));
    }
  };

  const handleEditNewBooks = (newData) => {
    setNewBooks(newData);
  };

  const handleEditNewBooksInfo = (newData) => {
    setNewBooksInfo(newData);
  };

  return (
    <PageContainer footer>
      <CollectionEditPageContainer>
        <div className="content">
          <CollectionInfoInput data={data} setData={setData} />
          <CollectionEditBookInput
            data={data}
            newBooks={newBooks}
            newBooksInfo={newBooksInfo}
            handleEditNewBooks={handleEditNewBooks}
            handleEditNewBooksInfo={handleEditNewBooksInfo}
          />
        </div>
        <CollectionWriteBtns
          handleCollectionWrite={handleCollectionEdit}
          isFilled={isFilled}
          type="edit"
        />
      </CollectionEditPageContainer>
    </PageContainer>
  );
};

export default CollectionEditPage;
