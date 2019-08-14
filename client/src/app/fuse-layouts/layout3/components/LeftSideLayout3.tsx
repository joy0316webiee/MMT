import React, { FC } from 'react';
import * as fuse from '@fuse';

const { FuseShortcuts, FuseSidePanel }: any = fuse;

const LeftSideLayout3: FC = () => (
  <>
    <FuseSidePanel>
      <FuseShortcuts className="py-16 px-8" variant="vertical" />
    </FuseSidePanel>
  </>
);

export default LeftSideLayout3;
