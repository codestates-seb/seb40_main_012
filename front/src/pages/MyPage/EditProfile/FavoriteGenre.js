import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import * as React from 'react';

const options = [
  '선호 장르',
  '건강/취미',
  '경제경영',
  '고전',
  '과학',
  '대학교재/전문서적',
  '만화',
  '사회과학',
  '소설/시/희곡',
  '수험서/자격증',
  '어린이',
  '에세이',
  '여행',
  '역사',
  '요리/살림',
  '외국어',
  '유아',
  '인문학',
  '자기계발',
  '장르소설',
  '잡지',
  '종교/역학',
  '컴퓨터/모바일',
];

const FavoriteGenre = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const ITEM_HEIGHT = 24;
  return (
    <>
      <List component="nav" sx={{ bgcolor: 'background.paper', padding: 0 }}>
        <ListItem
          button
          id="lock-button2"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
          sx={{ padding: 0 }}
        >
          <ListItemText secondary={options[selectedIndex]} />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button2',
          role: 'listbox',
          maxHeight: ITEM_HEIGHT * 4.5,
          width: '20ch',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default FavoriteGenre;
