import React, { useEffect } from 'react';
import { FuseSplashScreen } from '@fuse';
import history from '@history';
import auth0Service from 'app/services/auth0Service';
import * as userActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import { useDispatch } from 'react-redux';

const Callback = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    auth0Service.init(success => {
      if (success) {
        auth0Service.handleAuthentication(props, () => {
          auth0Service.getUserData().then(tokenData => {
            dispatch(userActions.setUserDataAuth0(tokenData));
            dispatch(
              Actions.showMessage({
                message: 'Welcome, success to login', //text or html
                autoHideDuration: 6000, //ms
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
