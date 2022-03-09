/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { List, Datagrid, TextField } from 'react-admin';

export default function TargetList(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
      </Datagrid>
    </List>
  );
}
