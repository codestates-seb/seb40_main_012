import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

const Loading = () => {
  return (
    <Box sx={style}>
      <img src={process.env.PUBLIC_URL + '/images/spinner.gif'} alt="loading" />
    </Box>
  );
};

export default Loading;
