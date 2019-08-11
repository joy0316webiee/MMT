import React from 'react';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse';
import { LoginPageConfig } from 'app/main/auth/login/LoginPageConfig';
import { RegisterPageConfig } from 'app/main/auth/register/RegisterPageConfig';
import { DashboardConfig } from 'app/main/dashboard/DashboardConfig';
import { CallbackConfig } from 'app/main/callback/CallbackConfig';

const routeConfigs = [LoginPageConfig, RegisterPageConfig, DashboardConfig, CallbackConfig];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: '/',
    component: () => <Redirect to="/login" />
  }
];

export default routes;
