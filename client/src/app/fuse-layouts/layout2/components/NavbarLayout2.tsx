import React, { FC } from 'react';
import * as fuse from '@fuse';

import Logo from 'app/fuse-layouts/shared-components/Logo';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';

const { FuseScrollbars }: any = fuse;

const NavbarLayout2: FC = () => (
  <div className="flex flex-auto justify-between items-center w-full h-full container p-0 lg:px-24">
    <div className="flex flex-shrink-0 items-center pl-8 pr-16">
      <Logo />
    </div>
    <FuseScrollbars className="flex h-full items-center">
      <Navigation className="w-full" layout="horizontal" dense />
    </FuseScrollbars>
  </div>
);

export default NavbarLayout2;
