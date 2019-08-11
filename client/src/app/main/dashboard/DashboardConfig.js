import { authRoles } from 'app/auth';
import React from 'react';

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

/**
 * Lazy load Example
 */
/*
import React from 'react';

export const ExampleConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/example',
            component: React.lazy(() => import('./Example'))
        }
    ]
};
*/
