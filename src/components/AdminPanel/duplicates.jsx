/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import {
  List,
  Datagrid,
  TextField,
  DeleteButton,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

function Empty() {
  return (
    <Box textAlign="center" m={1}>
      <Typography variant="h4" paragraph>
        Ei päällekkäisiä ilmoituksia
      </Typography>
    </Box>
  );
}

export default function DuplicatesListView(props) {
  return (
    <List {...props} sort={{ field: 'Id', order: 'DESC' }} empty={<Empty />}>
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
