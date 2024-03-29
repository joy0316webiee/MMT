import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as fuse from '@fuse';

import history from '@history';
import * as userActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import auth0Service from 'app/services/auth0Service';

const { FuseSplashScreen }: any = fuse;

const Callback: FC = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth0Service.init((success: any) => {
      if (success) {
        auth0Service.handleAuthentication(props, () => {
          auth0Service.getUserData().then(tokenData => {
            dispatch(userActions.setUserDataAuth0(tokenData));
            dispatch(
              Actions.showMessage({
                message: 'Welcome, success to login', //text or html
                autoHideDuration: 5000, //ms
                anchorOrigin: {
                  vertical: 'top', //top bottom
                  horizontal: 'right' //left center right
                },
                variant: 'success' //success error info warning null
              })
            );
            history.push('/dashboard');
          });
        });
      }
    });
  }, [dispatch, props]);

  return <FuseSplashScreen />;
};

export default Callback;
