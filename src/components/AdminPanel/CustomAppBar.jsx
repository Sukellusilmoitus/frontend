/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { AppBar } from 'react-admin';
import CustomUserMenu from './CustomUserMenu';

function CustomAppBar(props) {
  return (
    <AppBar
      {...props}
      userMenu={<CustomUserMenu />}
    />
  );
}

export default CustomAppBar;
