import * as React from 'react';
import { useSelector } from 'react-redux';
import clsx from 'clsx';
// import { FuseNavigation } from '@fuse';
const { FuseNavigation } = require('@fuse');

interface IProps {
  className?: string;
  layout: string | 'vertical';
  dense?: boolean;
}

const Navigation: React.FC<IProps> = ({ className, layout, dense, ...props }) => {
  const navigation = useSelector(({ fuse }: any) => fuse.navigation);

  return <FuseNavigation className={clsx('navigation', className)} navigation={navigation} layout={layout} dense={dense} {...props} />;
};

export default Navigation;
