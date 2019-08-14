import React from 'react';

export interface INavbarFoldedToggleButtonProps {
  className: string;
  children?: React.ReactNode;
}

export interface INavbarMobileToggleButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export interface INavigationProps {
  className?: string;
  layout: string | 'vertical';
  dense?: boolean;
}
