import * as React from 'react';
// import { FuseShortcuts, FuseSidePanel } from '@fuse';
const { FuseShortcuts, FuseSidePanel } = require('@fuse');

const LeftSideLayout3: React.FC = () => (
  <React.Fragment>
    <FuseSidePanel>
      <FuseShortcuts className="py-16 px-8" variant="vertical" />
    </FuseSidePanel>
  </React.Fragment>
);

export default LeftSideLayout3;
