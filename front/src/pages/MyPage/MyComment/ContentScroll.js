import Grid from '@mui/material/Grid';
import { useState, useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import InfiniteScroll from 'react-infinite-scroll-component';
import theme from '../../../styles/theme';

const ContentContainer = styled.div`
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
      background-color: ${({ theme }) => theme.colors.mainColor};
    }
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
  margin-bottom: 0;
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

// 컴포넌트 반복해서 보여줄 함수, data.star의 수가 1이면 1번, 5면 5번
// const showStar = () => {

// };

const Content = () => {
  // const [view, setView] = useState(1);
  const [editMode, setEditMode] = useState(false);

  // const handleChangeView = (event) => {
  //   setView(event.target.value);
  // };
  const handleChangeEditMode = () => {
    setEditMode(!editMode);
  };

  const [data, setData] = useState({
    // items: Array(10).fill({
    //   content:
    //     '4권은 제인 오스틴이 스무 살 때 쓴 것으로, 영국을 무대로 여성의 결혼과 오해와 편견에서 일어나는 사랑의 엇갈림을 그린 연애 소설이다. 세밀한 인물 묘사와 풍자, 아이러니, 간결하게 대화를 처리하는 기법으로 오스틴의 작품 중 걸작으로 유명하다.',
    // }),
    items: Array(10).fill({
      content:
        '4권은 제인 오스틴이 스무 살 때 쓴 것으로, 영국을 무대로 여성의 결혼과 오해와 편견에서 일어나는 사랑의 엇갈림을 그린 연애 소설이다. 세밀한 인물 묘사와 풍자, 아이러니, 간결하게 대화를 처리하는 기법으로 오스틴의 작품 중 걸작으로 유명하다.',
    }),
    // Array10은 10번 제한 거는 것 , 배열 10개짜리 길이 (반복횟수)
    // items: data.map((it) => it.content),
    hasMore: true,
    id: 1,
    src: 'https://shopping-phinf.pstatic.net/main_3546279/35462795630.20221101101451.jpg?type=w300',
  });
  console.log(data.src);

  const ImgSrc = data.src;
  // 스크롤이 바닥에 닿을때 동작하는 함수
  const fetchMoreData = () => {
    if (data.items.length >= 100) {
      setData({
        items: data.items,
        hasMore: false,
        src: 'https://shopping-phinf.pstatic.net/main_3546279/35462795630.20221101101451.jpg?type=w300',
      });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    // setTimeout(() => {
    //   setState({
    //     items: state.items.concat(data[0].content),
    //   });
    // }, 500);
    setTimeout(() => {
      setData({
        items: data.items.concat(data.items),
        hasMore: true,
        src: 'https://shopping-phinf.pstatic.net/main_3546279/35462795630.20221101101451.jpg?type=w300',
      });
      console.log(data.hasMore);
    }, 800);
  };

  const onRemove = (targetId) => {
    const newCommentList = data.items.filter((el) => el.id !== targetId);
    setData(newCommentList);
  };

  const handleClickRemove = () => {
    if (window.confirm(`${data[0].id}번째 코멘트를 정말 삭제하시겠습니까?`)) {
      onRemove(data[0].id);
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
      data.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };
  useEffect(() => {
    console.log('hello');
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <ContentContainer>
          <InfiniteScroll
            dataLength={data.items.length}
            // dataLength={contentLength}
            next={data && fetchMoreData}
            hasMore={data.hasMore} // 스크롤 막을지 말지 결정
            loader={<h4>Loading...</h4>}
            height={400}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            <Grid container xs={12}>
              <Grid item xs={5.5} sx={{ mt: 1, mb: 2 }}>
                <CommentContainer>
                  {editMode ? (
                    <>
                      <input
                        type="checkbox"
                        name="select-all"
                        onChange={(e) => handleAllCheck(e.target.checked)}
                        checked={
                          checkItems.length === data.length ? true : false
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
                  mt: 1,
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                {editMode ? (
                  <>
                    <ButtonCSS onClick={handleClickRemove}>
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
                  <ButtonCSS onClick={handleChangeEditMode}>
                    <Typography
                      color="#737373"
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                      variant="body2"
                      gutterBottom
                    >
                      목록 편집
                    </Typography>
                  </ButtonCSS>
                )}
              </Grid>
            </Grid>

            <div>
              {data?.items.map((data, key) => (
                <div key={key}>
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
                            name={`select-${data.id}`}
                            onChange={(e) =>
                              handleSingleCheck(e.target.checked, data.id)
                            }
                            checked={
                              checkItems.includes(data.id) ? true : false
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
                            src={data && ImgSrc}
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
                          {data.content}
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
                            177
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
                      xs={0.5}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                      }}
                    >
                      {editMode ? (
                        <DeleteOutlinedIcon
                          color="disabled"
                          onClick={() => {
                            if (
                              window.confirm(
                                `${data.id}번째 코멘트를 삭제하시겠습니까?`
                              )
                            ) {
                              onRemove(data.id);
                            }
                          }}
                        />
                      ) : null}
                    </Grid>
                  </Grid>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </ContentContainer>
      </ThemeProvider>
    </>
  );
};
export default Content;
