/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Edit,
  SimpleForm,
  TextInput,
  EditButton,
} from 'react-admin';

const userFilters = [
  <TextInput source="name" label="Search" alwaysOn />,
];

function UserListView(props) {
  return (
    <List filters={userFilters} {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <EmailField source="email" />
        <TextField source="phone" />
        <EditButton />
      </Datagrid>
    </List>
  );
}

function UserListEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="town" />
        <TextInput source="email" />
        <TextInput source="phone" />
      </SimpleForm>
    </Edit>
  );
}

export { UserListView, UserListEdit };
