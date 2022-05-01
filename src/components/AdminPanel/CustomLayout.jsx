/* eslint-disable react/jsx-props-no-spreading */
import { Layout } from 'react-admin';
import CustomAppBar from './CustomAppBar';

function CustomLayout(props) {
  return (
    <Layout {...props} appBar={CustomAppBar} />
  );
}
export default CustomLayout;
