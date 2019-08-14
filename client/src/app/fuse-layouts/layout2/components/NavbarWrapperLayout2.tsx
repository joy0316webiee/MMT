import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Paper, Drawer, Hidden } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';

import * as Actions from 'app/store/actions';
import NavbarMobileLayout2 from 'app/fuse-layouts/layout2/components/NavbarMobileLayout2';
import NavbarLayout2 from './NavbarLayout2';

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

const NavbarWrapperLayout2: FC = props => {
  const dispatch = useDispatch();
  const navbarTheme = useSelector(({ fuse }: any) => fuse.settings.navbarTheme);
  const navbar = useSelector(({ fuse }: any) => fuse.navbar);

  const classes: any = useStyles(props);

  return (
    <ThemeProvider theme={navbarTheme}>
      <Hidden mdDown>
        <Paper className={classes.navbar} square={true}>
          <NavbarLayout2 />
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
          <NavbarMobileLayout2 />
        </Drawer>
      </Hidden>
    </ThemeProvider>
  );
};

export default NavbarWrapperLayout2;
