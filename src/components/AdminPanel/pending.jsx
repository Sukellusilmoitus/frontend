/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  EditButton,
} from 'react-admin';

function PendingListView(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="town" />
        <TextField source="source" />
        <TextField source="created_at" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
function PendingListEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="user_id" />
        <TextInput source="name" />
        <TextInput source="town" />
        <TextInput source="type" />
        <TextInput source="location_method" />
        <TextInput source="location_accuracy" />
        <TextInput source="url" />
        <TextInput source="created_at" />
        <TextInput source="is_ancient" />
        <TextInput source="source" />
        <TextInput source="coordinates" />
        <BooleanInput source="is_pending" />
        <TextInput source="miscellaneous" />
      </SimpleForm>
    </Edit>
  );
}

export { PendingListView, PendingListEdit };
