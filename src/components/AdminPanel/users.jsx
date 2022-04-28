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
    <List filters={userFilters} {...props} bulkActionButtons={false} sort={{ field: 'Id', order: 'DESC' }}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" label="Nimi" />
        <EmailField source="email" label="Sähköposti" />
        <TextField source="phone" label="Puhelin nro" />
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
        <TextInput source="name" label="Nimi" />
        <TextInput source="email" label="Sähköposti" />
        <TextInput source="phone" label="Puhlin nro" />
      </SimpleForm>
    </Edit>
  );
}

export { UserListView, UserListEdit };
