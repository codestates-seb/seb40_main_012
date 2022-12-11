import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function FormPropsTextFields({ outLinkBind }) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '35ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-search"
        label="외부 링크가 있다면 첨부해주세요"
        type="search"
        {...outLinkBind}
      />
    </Box>
  );
}
