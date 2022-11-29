//import axios from '../../../api/axios';
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
`;

const AuthorResponse = {
  title: '양귀자 모음',
  books: [
    {
      isbn13: '9',
      title: 'Stub_Book_9',
      author: '양귀자 (지은이)',
      ratingCount: 3,
      bookCover:
        'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
    },
    {
      isbn13: '3',
      title: 'Stub_Book_3',
      author: '양귀자 (지은이)',
      ratingCount: 24,
      bookCover:
        'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
    },
    {
      isbn13: '44',
      title: 'Stub_Book_44',
      author: '양귀자 (지은이)',
      ratingCount: 26,
      bookCover:
        'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
    },
    {
      isbn13: '37',
      title: 'Stub_Book_37',
      author: '양귀자 (지은이)',
      ratingCount: 8,
      bookCover:
        'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
    },
    {
      isbn13: '23',
      title: 'Stub_Book_23',
      author: '양귀자 (지은이)',
      ratingCount: 23,
      bookCover:
        'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
    },
    {
      isbn13: '45',
      title: 'Stub_Book_45',
      author: '양귀자 (지은이)',
      ratingCount: 32,
      bookCover:
        'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
    },
  ],
};

const CriticResponse = {
  title: '00 평론가가 평가한 그 책',
  books: [
    {
      isbn13: '9788998441012',
      title: '모순 - 개정판',
      author: '양귀자 (지은이)',
      ratingCount: 0,
      bookCover:
        'https://image.aladin.co.kr/product/2584/37/cover/8998441012_2.jpg',
    },
    {
      isbn13: '9788965880783',
      title:
        '원미동 시인 「양귀자」 - 원미동 시인, 비 오는 날이면 가리봉동에 가야 한다, 한계령',
      author: '양귀자 (지은이), 김양선 (엮은이), 이경하 (그림)',
      ratingCount: 0,
      bookCover:
        'https://image.aladin.co.kr/product/1522/60/cover/8965880785_1.jpg',
    },
    {
      isbn13: '9788998441074',
      title: '나는 소망한다 내게 금지된 것을',
      author: '양귀자 (지은이)',
      ratingCount: 0,
      bookCover:
        'https://image.aladin.co.kr/product/18936/52/cover/8998441071_1.jpg',
    },
    {
      isbn13: '9788998441005',
      title: '원미동 사람들',
      author: '양귀자 (지은이)',
      ratingCount: 0,
      bookCover:
        'https://image.aladin.co.kr/product/2187/40/cover/8998441004_2.jpg',
    },
    {
      isbn13: '9788998441029',
      title: '천년의 사랑 - 개정판',
      author: '양귀자 (지은이)',
      ratingCount: 0,
      bookCover:
        'https://image.aladin.co.kr/product/2585/74/cover/8998441020_1.jpg',
    },
    {
      isbn13: '9788998441043',
      title: '슬픔도 힘이 된다 - 개정판',
      author: '양귀자 (지은이)',
      ratingCount: 0,
      bookCover:
        'https://image.aladin.co.kr/product/4877/74/cover/8998441047_1.jpg',
    },
  ],
};

//TODO: 컬렉션 Id로 navigate 적용
const CollectionLargeSet = ({ type }) => {
  const navigate = useNavigate();
  //const GetURL =
  type === 'author' ? '/api/collections/author' : '/api/collections/critic';

  const [data, setData] = useState({
    title: '',
    books: [],
  });

  useEffect(() => {
    // axios
    //   .get(`${GetURL}`)
    //   .then((res) => {
    //     setData(res.data);
    //   })
    //   .catch((error) => console.error(error));

    if (type === 'author') setData(AuthorResponse);
    else setData(CriticResponse);
  }, []);

  const onClickCollection = (collectionId) => {
    navigate(`/collection/${collectionId}`);
  };
  return (
    <CollectionLargeSetContainer onClick={() => onClickCollection(1)}>
      <CollectionSetTitle title={data.title}></CollectionSetTitle>
      <CollectionLargeBooks books={data.books} />
    </CollectionLargeSetContainer>
  );
};

export default CollectionLargeSet;
