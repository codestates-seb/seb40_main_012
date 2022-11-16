import Grid from '@mui/material/Grid';
import { useState } from 'react';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';

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
      background-color: #cfc3ff;
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

  const [data, setData] = useState([
    {
      id: 0,
      src: 'https://shopping-phinf.pstatic.net/main_3546279/35462795630.20221101101451.jpg?type=w300',
      content:
        '사상사 연구자이자 칼럼니스트인 김영민 서울대 교수가 들려주는 인생의 허무와 더불어 사는 법. 북송시대 문장가 소식의 「적벽부」를 모티프 삼아, 인류의 보편적 문제인 ‘허무’에 대한 오래된 사유의 결과물을 그만의 독특한 시선으로 포착해내고 재해석했다. 허무라는 주제를 다룬 만큼 죽음과 해골이 등장하지만, 김영민식의 유머와 통찰 덕분에 너무 무겁지 않으면서도 너무 가볍지 않게 허무를 직면하고 받아들일 수 있다. 인생이 허무하다고 느껴지는 순간을 경험한 이라면 그의 글을 통해 일상을 버틸 수 있는 작은 위안을 얻을 수 있다. 천천히 읽을수록, 곁에 두고 오래 음미할수록 그 가치가 빛을 발한다.',
      star: 5,
    },
    {
      id: 1,
      src: 'https://shopping-phinf.pstatic.net/main_3248962/32489623089.20221019150721.jpg?type=w300',
      content:
        '‘버지니아 울프 전집’이 29년 만에 완간을 기념하여 특별한 디자인과 더욱 가벼워진 판형으로 독자들을 찾아간다. 조이스, 프루스트와 함께 ‘의식의 흐름’의 대가라 불리는 울프는 이 실험적인 기법을 통해 인간 심리의 가장 깊은 곳까지 파고든 작가이다.',
      star: 3,
    },
    {
      id: 2,
      src: 'https://image.aladin.co.kr/product/23601/3/cover500/e702537182_1.jpg',
      content:
        '4권은 제인 오스틴이 스무 살 때 쓴 것으로, 영국을 무대로 여성의 결혼과 오해와 편견에서 일어나는 사랑의 엇갈림을 그린 연애 소설이다. 세밀한 인물 묘사와 풍자, 아이러니, 간결하게 대화를 처리하는 기법으로 오스틴의 작품 중 걸작으로 유명하다.',
      star: 4,
    },
  ]);

  const onRemove = (targetId) => {
    const newCommentList = data.filter((el) => el.id !== targetId);
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

  return (
    <>
      <ContentContainer>
        <Grid container xs={12}>
          <Grid item xs={5.5} sx={{ mt: 1, mb: 2 }}>
            <CommentContainer>
              {editMode ? (
                <>
                  <input
                    type="checkbox"
                    name="select-all"
                    onChange={(e) => handleAllCheck(e.target.checked)}
                    checked={checkItems.length === data.length ? true : false}
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
            xs={6.5}
            item
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
          {data?.map((data, key) => (
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
                        checked={checkItems.includes(data.id) ? true : false}
                      />
                    </>
                  ) : null}
                </Grid>

                <Grid item xs={2}>
                  <BookImg>
                    <img
                      className="resize"
                      src={data.src}
                      alt="book thumbnail"
                    ></img>
                  </BookImg>
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
      </ContentContainer>
    </>
  );
};
export default Content;
