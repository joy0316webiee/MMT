import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';
import { Paper, Drawer, Hidden } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import NavbarMobileLayout3 from './NavbarMobileLayout3';
import NavbarLayout3 from './NavbarLayout3';

const navbarWidth = 280;

const useStyles = makeStyles(
  (theme: any): any => ({
    navbar: {
      display: 'flex',
      overflow: 'hidden',
      height: 64,
      minHeight: 64,
      alignItems: 'center',
      boxShadow: theme.shadows[3],
      zIndex: 6
    },
    navbarMobile: {
      display: 'flex',
      overflow: 'hidden',
      flexDirection: 'column',
      width: navbarWidth,
      minWidth: navbarWidth,
      height: '100%',
      zIndex: 4,
      transition: theme.transitions.create(['width', 'min-width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.shorter
      }),
      boxShadow: theme.shadows[3]
    }
  })
);

const NavbarWrapperLayout3: FC = props => {
  const dispatch = useDispatch();
  const navbarTheme = useSelector(({ fuse }: any) => fuse.settings.navbarTheme);
  const navbar = useSelector(({ fuse }: any) => fuse.navbar);

  const classes: any = useStyles(props);

  return (
    <ThemeProvider theme={navbarTheme}>
      <Hidden mdDown>
        <Paper className={clsx(classes.navbar)} square={true}>
          <NavbarLayout3 />
        </Paper>
      </Hidden>

      <Hidden lgUp>
        <Drawer
          anchor="left"
          variant="temporary"
          open={navbar.mobileOpen}
          classes={{
            paper: classes.navbarMobile
          }}
          onClose={ev => dispatch(Actions.navbarCloseMobile())}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
        >
          <NavbarMobileLayout3 />
        </Drawer>
      </Hidden>
    </ThemeProvider>
  );
};

export default NavbarWrapperLayout3;
