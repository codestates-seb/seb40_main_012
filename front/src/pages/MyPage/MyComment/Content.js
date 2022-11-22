import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import InfiniteScroll from 'react-infinite-scroll-component';

const ContentContainer = styled.div`
  margin-bottom: 10rem;
  input {
    appearance: none;
    width: 20px;
    height: 20px;
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem;
    margin-top: -0.1px;
    &:checked {
      border-color: transparent;
      background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
      background-size: 100% 100%;
      background-position: 50%;
      background-repeat: no-repeat;
      background-color: #cfc3ff;
    }
  }
  img {
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 200px;
    height: 200px;
  }
  .fixed {
    position: fixed;
  }
`;
const BookImg = styled.div`
  .resize {
    box-sizing: inherit;
    width: 108px !important;
    height: 164px !important;
    margin-left: 10px;
  }
`;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
  font-size: 13px;
  border-bottom: 1px solid #e9e9e9;
  .comment {
    height: 125px;
    color: #232627;
  }
  .heart-star-title {
    display: flex;
    flex-direction: row;
  }
`;
const ButtonCSS = styled.button`
  outline: none;
  display: inline-block;
  margin: 0;
  text-transform: uppercase;
  cursor: pointer;
  border: 0;
  outline: 0;
  background: transparent;
`;

const Remove = styled.div`
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  opacity: 0;
  &:hover {
    color: #6741ff;
  }
`;

const ItemContainer = styled.div`
  &:hover {
    ${Remove} {
      opacity: 1;
    }
  }
`;

const FixContentScroll = ({ commentData }) => {
  const [editMode, setEditMode] = useState(false);
  console.log(commentData);
  const handleChangeEditMode = () => {
    setEditMode(!editMode);
  };
  const [data, setData] = useState({
    content: commentData,
    hasMore: true,
  });

  console.log(data.content);

  // 스크롤이 바닥에 닿을때 동작하는 함수
  const fetchMoreData = () => {
    if (data.content.length >= 100) {
      setData({
        content: data.content,
        hasMore: false,
      });
      return;
    }
    setTimeout(() => {
      setData({
        content: data.content.concat(data.content),
        hasMore: true,
      });
      console.log(data.hasMore);
    }, 800);
  };

  const onRemove = (targetId) => {
    const newCommentList = data.content.filter(
      (el) => el.commentId !== targetId
    );
    setData({ content: newCommentList, hasMore: true });
  };

  const removeAll = () => {
    if (window.confirm(`모든 데이터를 정말 삭제하시겠습니까?`)) {
      setData({ content: [], hasMore: false });
    }
  };

  const [checkItems, setCheckItems] = useState([]);
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      data.content.forEach((el) => idArray.push(el.commentId));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  console.log('checkItems', checkItems);
  useEffect(() => {
    console.log('hello');
  }, []);
  console.log(commentData);
  return (
    <>
      <ContentContainer>
        <Grid container xs={12}>
          <Grid item xs={5.5} sx={{ mt: 1, mb: 1 }}>
            <CommentContainer>
              {editMode ? (
                <>
                  <input
                    type="checkbox"
                    name="select-all"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={
                      checkItems.length === data.content.length ? true : false
                    }
                  ></input>
                  <Typography
                    color="#737373"
                    variant="body2"
                    gutterBottom
                    sx={{ ml: 2 }}
                  >
                    전체 선택
                  </Typography>
                </>
              ) : null}
            </CommentContainer>
          </Grid>

          <Grid
            item
            xs={6.5}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
          >
            {editMode ? (
              <>
                <ButtonCSS
                // onClick={handleClickRemove}
                >
                  <Typography color="#737373" variant="body2" gutterBottom>
                    선택 삭제
                  </Typography>
                </ButtonCSS>

                <ButtonCSS onClick={handleChangeEditMode}>
                  <Typography color="#737373" variant="body2" gutterBottom>
                    편집 완료
                  </Typography>
                </ButtonCSS>
              </>
            ) : (
              <ButtonCSS onClick={removeAll}>
                <Typography
                  color="#737373"
                  sx={{
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    mt: 1,
                    mb: 1,
                  }}
                  variant="body2"
                  gutterBottom
                >
                  전체 삭제
                </Typography>
              </ButtonCSS>
            )}
          </Grid>
        </Grid>

        <InfiniteScroll
          dataLength={data.content.length}
          // dataLength={contentLength}
          next={data.content && fetchMoreData}
          hasMore={data.hasMore} // 스크롤 막을지 말지 결정
          loader={
            <p
              style={{
                textAlign: 'center',
              }}
            >
              <img
                src={'/images/cherrypick_loading.gif'}
                alt="loading cherrypick"
              ></img>
            </p>
          }
          height={400}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div>
            {data.content.map((data, key) => (
              <ItemContainer key={key}>
                <Grid
                  container
                  xs={12}
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <Grid item xs={0.5} sx={{ width: 20 }}>
                    {editMode ? (
                      <>
                        <input
                          type="checkbox"
                          name={`select-${data.commentId}`}
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, data.commentId)
                          }
                          checked={
                            checkItems.includes(data.commentId) ? true : false
                          }
                        />
                      </>
                    ) : null}
                  </Grid>

                  <Grid item xs={2}>
                    {data && (
                      <BookImg>
                        <img
                          className="resize"
                          src="https://shopping-phinf.pstatic.net/main_3546279/35462795630.20221101101451.jpg?type=w300"
                          alt="book thumbnail"
                        ></img>
                      </BookImg>
                    )}
                  </Grid>
                  <Grid item xs={9}>
                    <FlexBox>
                      <Typography
                        color="#232627"
                        sx={{
                          height: 125,
                        }}
                        variant="body2"
                        gutterBottom
                      >
                        {data.body}
                      </Typography>

                      <div className="heart-star-title">
                        <Grid item xs={3}>
                          <StarBorderRoundedIcon
                            align="center"
                            style={{ color: 'FFF599' }}
                          />
                        </Grid>
                        <Grid
                          item
                          xs={3}
                          sx={{
                            display: 'flex',

                            alignItems: 'center',
                          }}
                          color="#BFBFBF"
                        >
                          <FavoriteTwoToneIcon
                            sx={{ width: 19.5, height: 19.5 }}
                            align="center"
                            style={{ color: 'FFD8D8' }}
                          />
                          {data.likeCount}
                        </Grid>
                        <Grid
                          item
                          xs={6}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                          }}
                          align="right"
                          color="#737373"
                        >
                          <div>제목과 작가🎖</div>
                        </Grid>
                      </div>
                    </FlexBox>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      display: 'flex',
                      flexDirection: 'row-reverse',
                    }}
                  >
                    <Remove
                      onClick={() => {
                        if (
                          window.confirm(
                            `${data.commentId}번째 코멘트를 삭제하시겠습니까?`
                          )
                        ) {
                          onRemove(data.commentId);
                        }
                      }}
                    >
                      <DeleteOutlinedIcon />
                    </Remove>
                  </Grid>
                </Grid>
              </ItemContainer>
            ))}
          </div>
        </InfiniteScroll>
      </ContentContainer>
    </>
  );
};
export default FixContentScroll;
