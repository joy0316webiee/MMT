import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import * as fuse from '@fuse';

import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import UserMenu from 'app/fuse-layouts/shared-components/UserMenu';

const { FuseSearch, FuseShortcuts }: any = fuse;

const useStyles = makeStyles((theme: any) => ({
  separator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider
  }
}));

const ToolbarLayout1: FC = props => {
  const config = useSelector(({ fuse }: any) => fuse.settings.current.layout.config);
  const toolbarTheme = useSelector(({ fuse }: any) => fuse.settings.toolbarTheme);

  const classes = useStyles(props);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
        <Toolbar className="p-0">
          {config.navbar.display && config.navbar.position === 'left' && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className="w-64 h-64 p-0" />
              <div className={classes.separator} />
            </Hidden>
          )}

          <div className="flex flex-1">
            <Hidden mdDown>
              <FuseShortcuts className="px-16" />
            </Hidden>
          </div>

          <div className="flex">
            <UserMenu />

            <div className={classes.separator} />

            <FuseSearch />

            <Hidden lgUp>
              <div className={classes.separator} />
            </Hidden>

            <div className={classes.separator} />

            <QuickPanelToggleButton />
          </div>

          {config.navbar.display && config.navbar.position === 'right' && (
            <Hidden lgUp>
              <NavbarMobileToggleButton />
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default ToolbarLayout1;
