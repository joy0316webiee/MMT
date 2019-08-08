import Dashboard from './Dashboard';

export const DashboardConfig = {
  settings: {
    layout: {
      config: {}
    }
  },
  routes: [
    {
      path: '/dashboard',
      component: Dashboard
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
