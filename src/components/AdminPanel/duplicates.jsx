/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
} from 'react-admin';

export default function DuplicatesListView(props) {
  return (
    <List {...props}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="coordinates" />
        <TextField source="source" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
