import * as React from 'react';
// import { FuseScrollbars } from '@fuse';

import Navigation from 'app/fuse-layouts/shared-components/Navigation';

const { FuseScrollbars } = require('@fuse');

const NavbarLayout3: React.FC = () => (
  <div className="flex flex-auto items-center w-full h-full container px-16 lg:px-24">
    <FuseScrollbars className="flex h-full items-center">
      <Navigation className="w-full -ml-12" layout="horizontal" dense />
    </FuseScrollbars>
  </div>
);

export default NavbarLayout3;
