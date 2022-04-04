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
    <List {...props} sort={{ field: 'Id', order: 'DESC' }}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" label="Nimi" />
        <TextField source="coordinates" label="Koordinaatit" />
        <TextField source="source" label="Lähde" />
        <DeleteButton />
      </Datagrid>
    </List>
  );
}
