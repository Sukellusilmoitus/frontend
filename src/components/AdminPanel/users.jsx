/* eslint-disable */
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
  Toolbar,
  SaveButton,
} from 'react-admin';

const userFilters = [
  <TextInput source="name" label="Search" alwaysOn />,
];

function UserListView(props) {
  return (
    <List filters={userFilters} {...props} bulkActionButtons={false}>
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

const UserEditToolbar = props => (
  <Toolbar {...props} >
    <SaveButton />
  </Toolbar>
);

function UserListEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput source="name" />
        <TextInput source="email" />
        <TextInput source="phone" />
      </SimpleForm>
    </Edit>
  );
}

export { UserListView, UserListEdit };
