import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Icon, IconButton } from '@material-ui/core';

import * as Actions from 'app/store/actions';

interface IProps {
  className?: string;
  children?: React.ReactNode;
}

const NavbarMobileToggleButton: React.FC<IProps> = ({ className, children }) => {
  const dispatch = useDispatch();

  return (
    <IconButton className={className} onClick={ev => dispatch(Actions.navbarToggleMobile())} color="inherit" disableRipple>
      {children}
    </IconButton>
  );
};

NavbarMobileToggleButton.defaultProps = {
  children: <Icon>menu</Icon>
};

export default NavbarMobileToggleButton;
