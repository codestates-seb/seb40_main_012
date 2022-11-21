import styled, { ThemeProvider } from 'styled-components';
import theme from '../../styles/theme';
import { Tag } from '../../components/tag';
import { useState } from 'react';

const CollectionInfoInputContainer = styled.div`
  width: 100%;
  padding: 30px 60px;
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

const TagContainer = styled.div`
  div {
    margin: 5px;
    &:hover {
      cursor: pointer;
      border: none;
      color: white;
      border: 1px solid ${({ theme }) => theme.colors.mainColor};
      background-color: ${({ theme }) => theme.colors.mainColor};
    }
  }
`;

const TagInput = styled.input`
  border: none;
  margin-left: 10px;
  &:focus {
    outline: none;
  }
`;

const TagInfo = styled.div`
  font-size: 12px;
  display: flex;
  div {
    padding: 10px;
  }
  &.hidden {
    display: none;
  }
  &.show {
    display: flex;
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
  font-family: RobotoInCjk, 'Noto Sans KR', 'Apple SD Gothic Neo',
    'Nanum Gothic', 'Malgun Gothic', sans-serif;
  color: ${({ theme }) => theme.colors.dark};
  line-height: 100%;
  &:focus {
    outline: none;
  }
`;

const CollectionInfoInput = ({ data, setData }) => {
  const [newTag, setNewTag] = useState('');
  const [isOnKeyUpTag, setIsOnKeyUp] = useState(false);

  const handleOnChangeNewTag = (e) => {
    setNewTag(e.target.value);
  };

  const handleOnKeyPressTag = (e) => {
    if (e.key === 'Enter') {
      setData({ ...data, tags: [...data.tags, newTag] });
      setNewTag('');
    }
  };

  const handleOnFoucusUpTag = () => {
    setIsOnKeyUp(true);
  };
  const handleOnBlurTag = () => {
    setIsOnKeyUp(false);
  };

  const handleOnChangeTitle = (e) => {
    setData({ ...data, title: e.target.value });
  };

  const handleOnChangeContent = (e) => {
    setData({ ...data, content: e.target.value });
  };

  const handleDeleteTag = (tagidx) => {
    setData({ ...data, tags: data.tags.filter((el, idx) => idx !== tagidx) });
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
                <TagContainer
                  key={idx}
                  onClick={() => {
                    handleDeleteTag(idx);
                  }}
                  role="presentation"
                >
                  <Tag>#{el}</Tag>
                </TagContainer>
              );
            })}
          </Tags>
          <TagInput
            type="text"
            placeholder="태그를 입력하세요"
            onChange={handleOnChangeNewTag}
            onKeyPress={handleOnKeyPressTag}
            onFocus={handleOnFoucusUpTag}
            onBlur={handleOnBlurTag}
            value={newTag}
          />
        </TagInputContainer>
        <TagInfo className={isOnKeyUpTag ? 'show' : 'hidden'}>
          <div>
            엔터를 입력하여 태그를 등록할 수 있습니다.
            <br />
            등록된 태그를 클릭하면 삭제됩니다.
          </div>
        </TagInfo>
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
