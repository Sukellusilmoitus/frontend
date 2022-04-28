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
import { makeStyles, Chip } from '@material-ui/core';

const useQuickFilterStyles = makeStyles((theme) => ({
  chip: {
    marginBottom: theme.spacing(1),
  },
}));

function QuickFilter({ label }) {
  const classes = useQuickFilterStyles();
  return <Chip className={classes.chip} label={label} />;
}

const targetFilters = [
  <TextInput source="name" label="Search" alwaysOn />,
  <QuickFilter source="usertarget" label="Ilmoitus" defaultValue />,
];

function TargetListView(props) {
  return (
    <List filters={targetFilters} {...props} sort={{ field: 'Id', order: 'DESC' }}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="name" label="Nimi" />
        <TextField source="town" label="Kaupunki" />
        <TextField source="source" label="Lähde" />
        <EditButton />
      </Datagrid>
    </List>
  );
}
function TargetListEdit(props) {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" label="Nimi" />
        <TextInput source="town" label="Kaupunki" />
        <TextInput source="location_method" label="Paikauus tapa" />
        <TextInput source="location_accuracy" label="Paikannus tarkkuus" />
        <TextInput source="url" />
        <TextInput source="source" label="Lähde" />
        <TextInput source="coordinates" label="Koordinaatit" />
      </SimpleForm>
    </Edit>
  );
}

export { TargetListView, TargetListEdit };
