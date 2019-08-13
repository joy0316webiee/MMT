import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FuseSplashScreen } from '@fuse';

import * as userActions from 'app/auth/store/actions';
import * as Actions from 'app/store/actions';
import firebaseService from 'app/services/firebaseService';
import auth0Service from 'app/services/auth0Service';
import jwtService from 'app/services/jwtService';

interface IProps {
  logout: () => (dispatch: any, getState: any) => null | undefined;
  setUserData: (user: any) => (dispatch: any) => void;
  setUserDataAuth0: (tokenData: any) => (dispatch: any) => void;
  setUserDataFirebase: (user: any, authUser: any) => (dispatch: any, getState: any) => any;
  showMessage: (options: any) => void;
  hideMessage: () => void;
}

interface IState {
  waitAuthCheck: boolean;
}
class Auth extends React.Component<IProps, IState> {
  state: IState = {
    waitAuthCheck: true
  };

  componentDidMount() {
    return Promise.all([
      // Comment the lines which you do not use
      //this.firebaseCheck(),
      this.auth0Check()
      //this.jwtCheck()
    ]).then(() => {
      this.setState({ waitAuthCheck: false });
    });
  }

  jwtCheck = () =>
    new Promise(resolve => {
      jwtService.on('onAutoLogin', () => {
        this.props.showMessage({ message: 'Logging in with JWT' });

        /**
         * Sign in and retrieve user data from Api
         */
        jwtService
          .signInWithToken()
          .then(user => {
            this.props.setUserData(user);

            resolve();

            this.props.showMessage({ message: 'Logged in with JWT' });
          })
          .catch(error => {
            this.props.showMessage({ message: error });

            resolve();
          });
      });

      jwtService.on('onAutoLogout', (message: any) => {
        if (message) {
          this.props.showMessage({ message });
        }

        this.props.logout();

        resolve();
      });

      jwtService.on('onNoAccessToken', () => {
        resolve();
      });

      jwtService.init();

      return Promise.resolve();
    });

  auth0Check = () =>
    new Promise(resolve => {
      auth0Service.init((success: any) => {
        if (!success) {
          resolve();
        }
      });

      if (auth0Service.isAuthenticated()) {
        /**
         * Retrieve user data from Auth0
         */
        auth0Service.getUserData().then(tokenData => {
          this.props.setUserDataAuth0(tokenData);

          resolve();
        });
      } else {
        resolve();
      }

      return Promise.resolve();
    });

  firebaseCheck = () =>
    new Promise(resolve => {
      firebaseService.init((success: any) => {
        if (!success) {
          resolve();
        }
      });

      firebaseService.onAuthStateChanged((authUser: any) => {
        if (authUser) {
          this.props.showMessage({ message: 'Logging in with Firebase' });

          /**
           * Retrieve user data from Firebase
           */
          firebaseService!.getUserData(authUser.uid)!.then(
            user => {
              this.props.setUserDataFirebase(user, authUser);

              resolve();

              this.props.showMessage({ message: 'Logged in with Firebase' });
            },
            error => {
              resolve();
            }
          );
        } else {
          resolve();
        }
      });

      return Promise.resolve();
    });

  render() {
    return this.state.waitAuthCheck ? <FuseSplashScreen /> : <React.Fragment children={this.props.children} />;
  }
}

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      setUserDataAuth0: userActions.setUserDataAuth0,
      setUserDataFirebase: userActions.setUserDataFirebase,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage
    },
    dispatch
  );

export default connect(
  null,
  mapDispatchToProps
)(Auth);