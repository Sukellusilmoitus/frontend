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

function DiveListView(props) {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="diver_id" />
        <TextField source="target_id" />
        <TextField source="created_at" />
        <TextField source="location_correct" />
        <TextField source="new_x_coordinate" />
        <TextField source="new_y_coordinate" />
        <TextField source="change_text" />
        <TextField source="miscellaneous" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
function DiveListEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="diver" />
        <TextInput source="target" />
        <TextInput source="created_at" />
        <TextInput source="location_correct" />
        <TextInput source="new_x_coordinate" />
        <TextInput source="new_y_coordinate" />
        <TextInput source="change_text" />
        <TextInput source="miscellaneous" />
      </SimpleForm>
    </Edit>
  );
}

export { DiveListView, DiveListEdit };
