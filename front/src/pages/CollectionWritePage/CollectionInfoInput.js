import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { Tag } from '../../components/tag';
import { useState } from 'react';

const CollectionInfoInputContainer = styled.div`
  width: 100%;
  padding: 60px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
`;

const TitleInput = styled.input`
  width: 100%;
  padding: 0 25px;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border: none;
  margin: 5px 0;
  &:focus {
    outline: none;
  }
  height: 80px;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.dark};
`;

const TagInputContainer = styled.div`
  width: 100%;
  margin: 5px 0;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
`;

const Tags = styled.div`
  display: flex;
  align-items: center;
`;

const TagInput = styled.input`
  border: 1px solid blue;
  &:focus {
    outline: none;
  }
`;

const ContentInputContainer = styled.div`
  height: 150px;
`;
const ContentInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 20px 25px;
  margin: 5px 0;
  border: 1px solid ${({ theme }) => theme.colors.dark};
  border: none;
  font-size: 15px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.dark};
  line-height: 100%;
  &:focus {
    outline: none;
  }
`;

const CollectionInfoInput = ({ data, setData }) => {
  const [newTag, setNewTag] = useState('');

  const handleOnChangeNewTag = (e) => {
    setNewTag(e.target.value);
  };

  const handleOnKeyPressTag = (e) => {
    if (e.key === 'Enter') {
      console.log('태그 입력');
      setData({ ...data, tags: [...data.tags, newTag] });
      setNewTag('');
    }
  };

  const handleOnChangeTitle = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const handleOnChangeContent = (e) => {
    setData({ ...data, content: e.target.value });
  };

  const handleDeleteTag = (idx) => {
    console.log(idx);
  };

  return (
    <ThemeProvider theme={theme}>
      <CollectionInfoInputContainer>
        <TitleInput
          type="text"
          placeholder="컬렉션 제목"
          maxLength="30"
          onChange={handleOnChangeTitle}
        ></TitleInput>
        <TagInputContainer>
          <Tags>
            {data.tags.map((el, idx) => {
              return (
                <div
                  key={idx}
                  onClick={() => {
                    handleDeleteTag(idx);
                  }}
                  role="presentation"
                >
                  <Tag>#{el}</Tag>
                </div>
              );
            })}
          </Tags>
          <TagInput
            type="text"
            placeholder="태그를 입력하세요"
            onChange={handleOnChangeNewTag}
            onKeyPress={handleOnKeyPressTag}
            value={newTag}
          />
        </TagInputContainer>
        <ContentInputContainer>
          <ContentInput
            type="text"
            placeholder="컬렉션을 소개해 보세요."
            maxLength="250"
            onChange={handleOnChangeContent}
          />
        </ContentInputContainer>
      </CollectionInfoInputContainer>
    </ThemeProvider>
  );
};

export default CollectionInfoInput;
