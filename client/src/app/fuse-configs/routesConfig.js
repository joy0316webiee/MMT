import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { LoginPageConfig } from 'app/main/auth/login/LoginPageConfig';
import { RegisterPageConfig } from 'app/main/auth/register/RegisterPageConfig';
import { DashboardConfig } from 'app/main/dashboard/DashboardConfig';

const routeConfigs = [LoginPageConfig, RegisterPageConfig, DashboardConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/login" />
  }
];

export default routes;
