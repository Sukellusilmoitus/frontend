import { Admin } from 'react-admin';
import getAllTargets from '../../services/targets';

export default function AdminPanel() {
  return (
    <Admin dataProvider={getAllTargets} />
  );
}
