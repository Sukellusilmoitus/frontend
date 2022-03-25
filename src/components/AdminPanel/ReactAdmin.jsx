import { Admin } from 'react-admin';
import getAllTargets from '../../services/targets';
import ThemeProvider from '@material-ui/styles'

export default function AdminPanel() {
  return (
    <Admin dataProvider={getAllTargets} />
  );
}
