import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FullWidthTextField({ titleBind }) {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        required
        type="text"
        inputProps={{ maxLength: 30 }}
        label="제목을 입력해주세요"
        id="fullWidth"
        {...titleBind}
      />
    </Box>
  );
}
