import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import TargetList from './targets';
import UserList from './users';

const dataProvider = jsonServerProvider('http://127.0.0.1:5000/api/admin');
export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="targets" list={TargetList} />
      <Resource name="users" list={UserList} />
    </Admin>
  );
}
