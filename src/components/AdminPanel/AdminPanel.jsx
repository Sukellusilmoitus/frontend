import { Admin, Resource } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { TargetListView, TargetListEdit } from './targets';
import { UserListView, UserListEdit } from './users';
import { DiveListView, DiveListEdit } from './dives';
import { PendingListView, PendingListEdit } from './pending';

const dataProvider = jsonServerProvider('http://127.0.0.1:5000/api/admin');
export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource name="targets" list={TargetListView} edit={TargetListEdit} icon={PostIcon} />
      <Resource name="users" list={UserListView} edit={UserListEdit} icon={UserIcon} />
      <Resource name="dives" list={DiveListView} edit={DiveListEdit} />
      <Resource name="pending" list={PendingListView} edit={PendingListEdit} />
    </Admin>
  );
}
