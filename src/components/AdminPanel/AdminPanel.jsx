import { Admin, Resource, fetchUtils } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import { TargetListView, TargetListEdit } from './targets';
import { UserListView, UserListEdit } from './users';
import { DiveListView, DiveListEdit } from './dives';
import { PendingListView, PendingListEdit } from './pending';
import DuplicatesListView from './duplicates';
import REACT_APP_SERVER_URL from '../../util/config';
import authProvider from './authProvider';

const httpClient = (url, options = {}) => {
  const requestOptions = options;
  requestOptions.expando = {};
  if (!requestOptions.headers) {
    requestOptions.headers = new Headers({ Accept: 'application/json' });
  }
  const token = localStorage.getItem('auth');
  requestOptions.headers.set('X-ACCESS-TOKEN', `${token}`);
  return fetchUtils.fetchJson(url, requestOptions);
};

const dataProvider = jsonServerProvider(`${REACT_APP_SERVER_URL}/api/admin`, httpClient);

export default function AdminPanel() {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource name="targets" options={{ label: 'Hylyt' }} list={TargetListView} edit={TargetListEdit} icon={PostIcon} />
      <Resource name="users" options={{ label: 'Käyttäjät' }} list={UserListView} edit={UserListEdit} icon={UserIcon} />
      <Resource name="dives" options={{ label: 'Sukellusilmoitukset' }} list={DiveListView} edit={DiveListEdit} />
      <Resource name="pending" options={{ label: 'Hyväksyttävät' }} list={PendingListView} edit={PendingListEdit} />
      <Resource name="duplicates" options={{ label: 'Päällekkäiset ilmoitukset' }} list={DuplicatesListView} />
    </Admin>
  );
}
