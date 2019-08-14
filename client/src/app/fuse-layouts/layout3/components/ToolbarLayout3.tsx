import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import { AppBar, Hidden, Toolbar } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import * as fuse from '@fuse';

import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import QuickPanelToggleButton from 'app/fuse-layouts/shared-components/quickPanel/QuickPanelToggleButton';
import Logo from 'app/fuse-layouts/shared-components/Logo';

const { FuseSearch }: any = fuse;

const useStyles = makeStyles((theme: any) => ({
  separator: {
    width: 1,
    height: 64,
    backgroundColor: theme.palette.divider
  }
}));

const ToolbarLayout3: FC = props => {
  const config = useSelector(({ fuse }: any) => fuse.settings.current.layout.config);
  const toolbarTheme = useSelector(({ fuse }: any) => fuse.settings.toolbarTheme);

  const classes = useStyles(props);

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar id="fuse-toolbar" className="flex relative z-10" color="default">
        <Toolbar className="container p-0 lg:px-24">
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarMobileToggleButton className="w-64 h-64 p-0" />
              <div className={classes.separator} />
            </Hidden>
          )}

          <Hidden mdDown>
            <div className={clsx('flex flex-shrink-0 items-center')}>
              <Logo />
            </div>
          </Hidden>

          <div className="flex flex-1">
            <Hidden xsDown>
              <FuseSearch className="mx-16 lg:mx-24" variant="basic" />
            </Hidden>
          </div>

          <div className="flex">
            <Hidden smUp>
              <FuseSearch />
              <div className={classes.separator} />
            </Hidden>

            <QuickPanelToggleButton />

            <Hidden mdDown>
              <div className={classes.separator} />
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default ToolbarLayout3;
