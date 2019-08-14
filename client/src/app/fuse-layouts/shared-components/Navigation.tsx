import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
import * as fuse from '@fuse';

import { INavigationProps } from './types';

const { FuseNavigation }: any = fuse;

const Navigation: FC<INavigationProps> = ({ className, layout, dense, ...props }) => {
  const navigation = useSelector(({ fuse }: any) => fuse.navigation);

  return (
    <FuseNavigation
      className={clsx('navigation', className)}
      navigation={navigation}
      layout={layout}
      dense={dense}
      {...props}
    />
  );
};

export default Navigation;
