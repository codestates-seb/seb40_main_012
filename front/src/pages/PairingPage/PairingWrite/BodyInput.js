import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function MultilineTextFields({ bodyBind }) {
  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '100%' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
        id="outlined-multiline-static"
        label="내용을 입력해주세요"
        placeholder="페어링을 추천하는 이유에 대해 적어주세요."
        {...bodyBind}
        multiline
        rows={10}
        inputProps={{ maxLength: 1000 }}
      />
    </Box>
  );
}
