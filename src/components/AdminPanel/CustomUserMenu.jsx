/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { UserMenu } from 'react-admin';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

const CustomUserMenu = React.forwardRef((props, ref) => (
  <UserMenu {...props}>
    <a style={{ textDecoration: 'none', color: 'grey' }} href="/">
      <MenuItem ref={ref} {...props}>
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText>
          Etusivu
        </ListItemText>
      </MenuItem>
    </a>
  </UserMenu>
));

export default CustomUserMenu;
