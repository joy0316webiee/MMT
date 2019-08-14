import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, IconButton } from '@material-ui/core';
import _ from '@lodash';

import * as Actions from 'app/store/actions';
import { INavbarFoldedToggleButtonProps } from './types';

const NavbarFoldedToggleButton: FC<INavbarFoldedToggleButtonProps> = ({
  className,
  children
}) => {
  const dispatch = useDispatch();
  const settings = useSelector(({ fuse }: any) => fuse.settings.current);

  return (
    <IconButton
      className={className}
      onClick={() => {
        dispatch(
          Actions.setDefaultSettings(
            _.set(
              {},
              'layout.config.navbar.folded',
              !settings.layout.config.navbar.folded
            )
          )
        );
      }}
      color="inherit"
    >
      {children}
    </IconButton>
  );
};

NavbarFoldedToggleButton.defaultProps = {
  children: <Icon>menu</Icon>
};

export default NavbarFoldedToggleButton;
