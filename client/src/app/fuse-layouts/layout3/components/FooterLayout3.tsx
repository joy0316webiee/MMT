import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

const FooterLayout3: FC = () => {
  const footerTheme = useSelector(({ fuse }: any) => fuse.settings.footerTheme);

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar id="fuse-footer" className="relative z-10" color="default">
        <Toolbar className="flex items-center container py-0 px-16 lg:px-24">
          <Typography>Footer</Typography>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default FooterLayout3;
