/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export default function UserList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="email" />
        <TextField source="phone" />
      </Datagrid>
    </List>
  );
}
