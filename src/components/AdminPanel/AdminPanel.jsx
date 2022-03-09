import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { TargetListView, TargetListEdit } from './targets';
import { UserListView, UserListEdit } from './users';

const dataProvider = jsonServerProvider('http://127.0.0.1:5000/api/admin');
export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="targets" list={TargetListView} edit={TargetListEdit} />
      <Resource name="users" list={UserListView} edit={UserListEdit} />
    </Admin>
  );
}
