import React, { FC, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Avatar,
  Button,
  Icon,
  ListItemIcon,
  ListItemText,
  Popover,
  MenuItem,
  Typography
} from '@material-ui/core';

import * as authActions from 'app/auth/store/actions';

const UserMenu: FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(({ auth }: any) => auth.user);

  const [userMenu, setUserMenu] = useState(null);

  const userMenuClick = (event: any) => setUserMenu(event.currentTarget);
  const userMenuClose = () => setUserMenu(null);

  return (
    <>
      <Button className="h-64" onClick={userMenuClick}>
        {user.data.photoURL ? (
          <Avatar className="" alt="user photo" src={user.data.photoURL} />
        ) : (
          <Avatar className="">{user.data.displayName[0]}</Avatar>
        )}

        <div className="hidden md:flex flex-col ml-12 items-start">
          <Typography component="span" className="normal-case font-600 flex">
            {user.data.displayName}
          </Typography>
          <Typography className="text-11 capitalize" color="textSecondary">
            {user.role.toString()}
          </Typography>
        </div>

        <Icon className="text-16 ml-12 hidden sm:flex">keyboard_arrow_down</Icon>
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        classes={{
          paper: 'py-8'
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/login">
              <ListItemIcon className="min-w-40">
                <Icon>lock</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Login" />
            </MenuItem>
            <MenuItem component={Link} to="/register">
              <ListItemIcon className="min-w-40">
                <Icon>person_add</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Register" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/pages/profile" onClick={userMenuClose}>
              <ListItemIcon className="min-w-40">
                <Icon>account_circle</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="My Profile" />
            </MenuItem>
            <MenuItem component={Link} to="/apps/mail" onClick={userMenuClose}>
              <ListItemIcon className="min-w-40">
                <Icon>mail</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Inbox" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                dispatch(authActions.logoutUser());
                userMenuClose();
              }}
            >
              <ListItemIcon className="min-w-40">
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText className="pl-0" primary="Logout" />
            </MenuItem>
          </>
        )}
      </Popover>
    </>
  );
};

export default UserMenu;
