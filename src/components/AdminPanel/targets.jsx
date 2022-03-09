/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
} from 'react-admin';

function TargetListView(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="town" />
        <TextField source="source" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
function TargetListEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="town" />
        <TextInput source="location_method" />
        <TextInput source="location_accuracy" />
        <TextInput source="url" />
        <TextInput source="source" />
        <TextInput source="coordinates" />
      </SimpleForm>
    </Edit>
  );
}

export { TargetListView, TargetListEdit };
