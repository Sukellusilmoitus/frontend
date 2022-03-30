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
