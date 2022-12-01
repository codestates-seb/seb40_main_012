/*eslint-disable*/
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography';
import FavoriteTwoToneIcon from '@mui/icons-material/FavoriteTwoTone';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import axios from '../../../api/axios';
// import { useNavigate } from 'react-router-dom';

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-right: 10px;
  padding-right: 20px;
  font-size: 13px;
  border-bottom: 1px solid #e9e9e9;
  width: 100%;

  .title-author {
    line-height: 1.5 !important;
    max-height: 3 !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 1 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }

  .content-body {
    line-height: 1.5 !important;
    max-height: 3 !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 3 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }

  cursor: pointer;
  .comment {
    height: 125px;
    color: #232627;
  }
  .heart-star-title {
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;

    img {
      width: 20px;
      height: 20px;
      margin-right: 2px;
    }
  }
  .title {
    :hover {
      color: #b09dff;
      transition: color 0.5s;
    }
    line-height: 1.5 !important;
    max-height: 3 !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 1 !important;
    -webkit-box-orient: vertical !important;
    overflow: hidden !important;
  }
`;

const NavigateBook = ({ data, navigate }) => {
  return (
    <FlexBox onClick={() => navigate(`/book/${data.contentId}`)}>
      <Grid sx={{ height: '32.8px' }}>
        <Typography
          className="title"
          sx={{
            display: 'flex',
            mt: 1,
            mb: 1,
            fontSize: 17,
            fontWeight: 400,
          }}
          color="#2e3031"
          variant="body2"
          component={'span'}
        >
          {data.title}
        </Typography>
      </Grid>
      <Grid sx={{ height: '98.4px' }}>
        <div className="content-body">
          <Typography
            color="#232627"
            sx={{
              fontWeight: 200,
              height: 'auto',
            }}
            variant="body2"
            component={'span'}
          >
            {data.body}
          </Typography>
        </div>
      </Grid>

      <Grid sx={{ height: '32.8px' }}>
        <div className="heart-star-title">
          <Grid
            item
            xs={3}
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
            color="#BFBFBF"
          >
            {data.commentType === 'BOOK' ? (
              <>
                <StarRoundedIcon
                  style={{ color: '#6741ff' }}
                  sx={{
                    fontSize: 22,
                    marginBottom: 0,
                    marginRight: 0.3,
                    margin: 0,
                    padding: 0,
                  }}
                  variant="body2"
                />

                {data.myBookRating !== null ? data.myBookRating : null}
              </>
            ) : (
              <>
                <img
                  src={
                    process.env.PUBLIC_URL + '/images/p_heart_filled_icon.svg'
                  }
                  alt="heart icon"
                />
                {data.likeCount}
              </>
            )}
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
            {data.commentType === 'BOOK' ? (
              <>
                <img
                  src={
                    process.env.PUBLIC_URL + '/images/p_heart_filled_icon.svg'
                  }
                  alt="heart icon"
                />
                {data.likeCount}
              </>
            ) : null}
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: 'flex',
              flexDirection: 'row-reverse',
            }}
            align="right"
            color="#b3b3b3"
          >
            <div className="title-author">
              {data.commentType === 'BOOK' ? data.title : null}{' '}
              {data.commentType === 'BOOK' ? data.author : null}
            </div>
          </Grid>
        </div>
      </Grid>
    </FlexBox>
  );
};

export default NavigateBook;
