// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';

const ContentContainer = styled.div`
  input {
    appearance: none;
    width: 1.2rem;
    height: 1.2rem;
    border: 1.5px solid gainsboro;
    border-radius: 0.35rem;
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
    width: 130px !important;
    height: 150px !important;
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
  .heart-star {
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
const Content = () => {
  // const [view, setView] = useState(1);
  const [editMode, setEditMode] = useState(false);

  // const handleChangeView = (event) => {
  //   setView(event.target.value);
  // };
  const handleChangeEditMode = () => {
    setEditMode(!editMode);
  };

  const data = [
    {
      id: 0,
      src: 'https://img1.goodfon.com/wallpaper/nbig/9/68/minas-gerais-brazil-nature.jpg',
      content: '본문 1',
    },
    {
      id: 1,
      src: 'https://destinosmineiros.com.br/wp-content/uploads/2015/12/Fundo-Ouro-Preto-11.jpg',
      content: '본문 2',
    },
    {
      id: 2,
      src: 'https://especiais.g1.globo.com/minas-gerais/2018/casca-danta-crioulo-tabuleiro-e-tempo-perdido-conheca-as-cachoeiras-de-minas/data/fundao_src.jpg',
      content: '본문 3',
    },
  ];

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
        <Grid container>
          <Grid item xs={5.5} sx={{ mt: 1, mb: 2 }}>
            <CommentContainer>
              <input
                type="checkbox"
                name="select-all"
                onChange={(e) => handleAllCheck(e.target.checked)}
                checked={checkItems.length === data.length ? true : false}
              ></input>

              <Typography color="#737373" variant="body2" gutterBottom>
                전체 선택
              </Typography>
            </CommentContainer>
          </Grid>
          <Grid item xs={4.5} sx={{ mt: 1, mb: 2 }}>
            <Typography color="#737373" variant="body2" gutterBottom>
              별점 및 코멘트
            </Typography>
          </Grid>
          {editMode ? (
            <>
              <Grid
                item
                xs={1}
                sx={{
                  mt: 1,
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <ButtonCSS>
                  <Typography color="#737373" variant="body2" gutterBottom>
                    선택 삭제
                  </Typography>
                </ButtonCSS>
              </Grid>
              <Grid
                item
                xs={1}
                sx={{
                  mt: 1,
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
              >
                <ButtonCSS onClick={handleChangeEditMode}>
                  <Typography color="#737373" variant="body2" gutterBottom>
                    편집 완료
                  </Typography>
                </ButtonCSS>
              </Grid>
            </>
          ) : (
            <Grid
              item
              xs={2}
              sx={{
                mt: 1,
                mb: 2,
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
            >
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
            </Grid>
          )}

          <div>
            {data?.map((data, key) => (
              <div key={key}>
                <CommentContainer>
                  <input
                    type="checkbox"
                    name={`select-${data.id}`}
                    onChange={(e) =>
                      handleSingleCheck(e.target.checked, data.id)
                    }
                    checked={checkItems.includes(data.id) ? true : false}
                  />
                  <Grid item xs={2}>
                    <BookImg>
                      <img
                        className="resize"
                        src={data.src}
                        alt="book thumbnail"
                      ></img>
                    </BookImg>
                  </Grid>
                  <Grid item xs={10}>
                    <FlexBox>
                      <span className="comment">
                        생각이 많은 건 말이야 당연히 해야 할 일이야 나에겐
                        우리가 지금 일순위야 안전한 유리병을 핑계로 바람을 가둬
                        둔 것 같지만 기억나? 그날의 우리가 잡았던 그 손엔 말이야
                        설레임보다 커다란 믿음이 담겨서 난 함박웃음을 지었지만
                        울음이 날 것도 같았어 소중한 건 언제나 두려움이니까 문을
                        열면 들리던 목소리 너로 인해 변해있던 따뜻한 공기 여전히
                        자신 없지만 안녕히 저기 사라진 별의 자리 아스라이 하얀
                        빛 한동안은 꺼내 볼 수 있을 거야 아낌없이 반짝인 시간은
                        조금씩 옅어져 가더라도 너와 내 맘에 살아 숨 쉴 테니
                      </span>
                      <div className="heart-star">
                        <Grid item xs={3}>
                          <div>⭐⭐⭐⭐⭐</div>
                        </Grid>
                        <Grid item xs={1} color="#BFBFBF">
                          <div>❤️177</div>
                        </Grid>
                        <Grid
                          item
                          xs={10}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row-reverse',
                          }}
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
                    <DeleteOutlinedIcon color="disabled" />
                  </Grid>
                </CommentContainer>
              </div>
            ))}
          </div>
        </Grid>
      </ContentContainer>
    </>
  );
};
export default Content;
