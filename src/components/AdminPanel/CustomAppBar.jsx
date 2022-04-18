/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { AppBar } from 'react-admin';
import CustomUserMenu from './CustomUserMenu';

function CustomAppBar(props) {
  return (
    <AppBar
      sx={{
        '& .RaAppBar-title': {
          flex: 1,
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
        },
      }}
      {...props}
      userMenu={<CustomUserMenu />}
    />
  );
}

export default CustomAppBar;
