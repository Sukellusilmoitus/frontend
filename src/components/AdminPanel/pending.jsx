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
import { Box, Typography } from '@mui/material';

function Empty() {
  return (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        Ei Hyväksyttäviä hylkyjä
      </Typography>
    </Box>
  );
}

function PendingListView(props) {
  return (
    <List {...props} sort={{ field: 'Id', order: 'DESC' }} empty={<Empty />}>
      <Datagrid>
        <TextField source="id" label="Id" />
        <TextField source="name" label="Nimi" />
        <TextField source="town" label="Kaupunki" />
        <TextField source="source" label="Lähde" />
        <TextField source="created_at" label="Päiväys" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
function PendingListEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="user_id" label="Käyttäjä id" />
        <TextInput source="name" label="Nimi" />
        <TextInput source="town" label="Kaupunki" />
        <TextInput source="type" label="Tyyppi" />
        <TextInput source="location_method" label="Paikannustapa" />
        <TextInput source="location_accuracy" label="Paikannus tarkkuus" />
        <TextInput source="url" />
        <TextInput source="created_at" label="Päiväys" />
        <TextInput source="is_ancient" />
        <TextInput source="source" label="Lähde" />
        <TextInput source="coordinates" label="Koordinaatit" />
        <BooleanInput source="is_pending" label="odottaa tarkistusta" />
        <TextInput source="miscellaneous" label="Lisätietoja" />
      </SimpleForm>
    </Edit>
  );
}

export { PendingListView, PendingListEdit };
