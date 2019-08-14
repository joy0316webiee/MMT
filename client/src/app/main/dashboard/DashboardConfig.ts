import React from 'react';
import { authRoles } from 'app/auth';

export const DashboardConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  auth: authRoles.user,
  routes: [
    {
      path: '/dashboard',
      component: React.lazy(() => import('./Dashboard'))
    }
  ]
};
