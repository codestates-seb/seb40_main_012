/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
// import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
// import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import MyPickBook from './MyPickBook';

import MyPickPairing from './MyPickPairing';
import MyPickCollection from './MyPickCollection';
import { useState } from 'react';
import MyPickGuide from './MyPickGuide';

const ContentContainer = styled.div`
  margin-bottom: 10rem;
  input[type='radio'],
  input:checked {
    /* appearance: none; */
    appearance: none;

    border-radius: 100%;
    margin-right: 0.1rem;
    width: 20px;
    height: 20px;
    border: 1.5px solid gainsboro;

    margin-top: -0.1px;
    accent-color: #cfc3ff;
    background-color: white;

    &:checked {
      background-color: #cfc3ff;
    }
  }
  img {
    align-items: center;
    justify-content: center;
    align-content: center;
    width: 100px;
    height: 100px;
  }
  .fixed {
    position: fixed;
  }
`;

// const BookImg = styled.div`
//   .resize {
//     box-sizing: inherit;
//     width: 108px !important;
//     height: 164px !important;
//     margin-left: 10px;
//   }
// `;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
// const FlexBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-left: 20px;
//   margin-right: 10px;
//   font-size: 13px;
//   border-bottom: 1px solid #e9e9e9;
//   .comment {
//     height: 125px;
//     color: #232627;
//   }
//   .heart-star-title {
//     display: flex;
//     flex-direction: row;
//   }
// `;
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

// const Remove = styled.div`
//   color: #dee2e6;
//   font-size: 24px;
//   cursor: pointer;
//   opacity: 0;
//   &:hover {
//     color: #6741ff;
//   }
// `;

// const ItemContainer = styled.div`
//   &:hover {
//     ${Remove} {
//       opacity: 1;
//     }
//   }
// `;

const Content = ({
  setContent,
  content,

  collectionContent,
  setCollectionContent,
  fetchCollectionData,
  fetchPairingData,
  fetchData,
}) => {
  // const [data, setData] = useState({
  //   content: content.data,
  //   hasMore: true,
  // });

  const [view, setView] = useState(1);

  // const onRemove = (targetId) => {
  //   const newCommentList = content.data.filter(
  //     (el) => el.commentId !== targetId
  //   );
  //   setContent({ data: newCommentList, hasMore: true });
  // };

  return (
    <>
      {content ? (
        <ContentContainer>
          <Grid
            container
            style={{
              textAlign: 'center',
              alignItems: 'center',
            }}
          >
            <Grid item xs={0.5} sx={{ width: 20 }}></Grid>
            <Grid item xs={5} sx={{ mt: 1, mb: 1 }}>
              <CommentContainer>
                <Typography
                  color="#737373"
                  sx={{
                    display: 'flex',
                  }}
                  variant="body2"
                  gutterBottom
                >
                  <input
                    type="radio"
                    onChange={() => setView(1)}
                    defaultChecked={true}
                    name="xxx"
                  />
                  페어링
                  <input
                    type="radio"
                    onChange={() => setView(2)}
                    defaultChecked={false}
                    name="xxx"
                  />
                  컬렉션
                  <input
                    type="radio"
                    onChange={() => setView(3)}
                    defaultChecked={false}
                    name="xxx"
                  />
                  책
                </Typography>
              </CommentContainer>
            </Grid>

            <Grid
              item
              xs={6.5}
              sx={{
                display: 'flex',
                flexDirection: 'row-reverse',
              }}
              style={{
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <MyPickGuide />
            </Grid>
          </Grid>
          {/* ///////////// */}

          <div>
            {view === 1 ? <MyPickPairing /> : null}

            {view === 2 ? (
              <MyPickCollection
                content={collectionContent}
                fetchCollectionData={fetchCollectionData}
              />
            ) : null}

            {view === 3 ? (
              <MyPickBook content={content} fetchData={fetchData} />
            ) : null}
          </div>
        </ContentContainer>
      ) : (
        <>
          <ContentContainer>
            <Grid
              container
              style={{
                textAlign: 'center',
                alignItems: 'center',
              }}
            >
              <Grid item xs={0.5} sx={{ width: 20 }}></Grid>
              <Grid item xs={5} sx={{ mt: 1, mb: 1 }}>
                <CommentContainer>
                  <Typography
                    color="#737373"
                    sx={{
                      display: 'flex',
                    }}
                    variant="body2"
                    gutterBottom
                  >
                    <input
                      type="radio"
                      onChange={() => setView(1)}
                      defaultChecked={true}
                      name="xxx"
                    />
                    페어링
                    <input
                      type="radio"
                      onChange={() => setView(2)}
                      defaultChecked={false}
                      name="xxx"
                    />
                    컬렉션
                    <input
                      type="radio"
                      onChange={() => setView(3)}
                      defaultChecked={false}
                      name="xxx"
                    />
                    책
                  </Typography>
                </CommentContainer>
              </Grid>

              <Grid
                item
                xs={6.5}
                sx={{
                  display: 'flex',
                  flexDirection: 'row-reverse',
                }}
                style={{
                  textAlign: 'center',
                  alignItems: 'center',
                }}
              >
                <MyPickGuide />
              </Grid>
            </Grid>
            {/* ///////////// */}
          </ContentContainer>
        </>
      )}
    </>
  );
};

export default Content;
