import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({ categoryBind }) {
  return (
    <Box sx={{ minWidth: 130 }}>
      <FormControl required sx={{ minWidth: 130 }}>
        <InputLabel id="demo-select-small">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="category"
          {...categoryBind}
        >
          <MenuItem value="FILM">영화</MenuItem>
          <MenuItem value="CUISINE">음식 및 장소</MenuItem>
          <MenuItem value="MUSIC">음악</MenuItem>
          <MenuItem value="BOOK">책</MenuItem>
          <MenuItem value="ETC">기타</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
