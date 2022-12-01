import Box from '@mui/material/Box';

const Loading = ({ backdrop }) => {
  const style = {
    position: 'absolute',
    top: backdrop ? 'calc(50% - 60px)' : '50%',
    left: '50%',
    transform: backdrop
      ? 'translate(-50%, calc(-50% + 30px))'
      : 'translate(-50%, -50%)',
  };

  return (
    <Box sx={style}>
      <img src={process.env.PUBLIC_URL + '/images/spinner.gif'} alt="loading" />
    </Box>
  );
};

export default Loading;
