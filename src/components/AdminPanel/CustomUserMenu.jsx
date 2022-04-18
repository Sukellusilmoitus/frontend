/* eslint-disable react/jsx-props-no-spreading */
import { UserMenu } from 'react-admin';
import homeIcon from '../../assets/images/home-icon.svg';

// the classnames are used to achieve mui look and feel for the custom menu item
// this way we don't need to actually install mui package

function CustomUserMenu(props) {
  return (
    <UserMenu {...props}>
      <div className="MuiListItem-root MuiListItem-gutters MuiListItem-button">
        <div className="MuiListItemIcon-root">
          <img src={homeIcon} alt="Home" />
        </div>
        <a
          href="/"
          style={{ color: 'grey' }}
        >
          Etusivu
        </a>
      </div>
    </UserMenu>
  );
}

export default CustomUserMenu;
