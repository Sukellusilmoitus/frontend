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
  UrlField,
  FunctionField,
  DateField,
  BooleanField,
} from 'react-admin';

function DiveListView(props) {
  return (
    <List {...props} sort={{ field: 'Id', order: 'DESC' }}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="diver_name" label="Sukeltaja" />
        <FunctionField source="target_name" label="Hylky" render={(dive) => <UrlField source="target_name" href={`/hylyt/${dive.target_id}`} />} />
        <DateField source="created_at" label="Päiväys" />
        <BooleanField source="location_correct" label="Sijainti oikein" />
        <TextField source="new_x_coordinate" label="Uusi x koordinaatti" />
        <TextField source="new_y_coordinate" label="Uusi y koordinaatti" />
        <TextField source="change_text" label="Muutokset" />
        <TextField source="miscellaneous" label="Lisätietoja" />
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
