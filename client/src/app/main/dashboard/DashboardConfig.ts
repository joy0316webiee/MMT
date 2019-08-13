import { authRoles } from 'app/auth';
import * as React from 'react';

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
