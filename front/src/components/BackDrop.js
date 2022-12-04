import Backdrop from '@mui/material/Backdrop';
import { Loading } from 'components';
import styled from 'styled-components';

const BackdropStyled = styled(Backdrop)`
  background-color: rgb(255, 255, 255, 0.5);
  top: 60px;
  z-index: 1400;
`;

const SimpleBackdrop = ({ open }) => {
  return (
    <div>
      <BackdropStyled
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Loading backdrop />
      </BackdropStyled>
    </div>
  );
};

export default SimpleBackdrop;
