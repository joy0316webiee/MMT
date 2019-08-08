import history from '@history';
import Auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { AUTH_CONFIG } from './auth0ServiceConfig';

class auth0Service {
  sdk = { auth0Manage: null };

  init() {
    if (Object.entries(AUTH_CONFIG).length === 0 && AUTH_CONFIG.constructor === Object) {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Missing Auth0 configuration at src/app/services/auth0Service/auth0ServiceConfig.js');
      }
      return;
    }

    this.auth0 = new Auth0.WebAuth({
      domain: AUTH_CONFIG.domain,
      clientID: AUTH_CONFIG.clientId,
      redirectUri: AUTH_CONFIG.callbackUrl,
      responseType: 'token id_token',
      scope: 'openid'
    });
  }

  login = ({ email, password }) => {
    if (!this.auth0) {
      return false;
    }

    this.auth0.login(
      {
        realm: 'Username-Password-Authentication',
        email,
        password
      },
      err => {
        if (err) return alert('Something went wrong12313: ' + err.message);
        else {
          console.log('here###');
          this.handleAuthentication();
        }
      }
    );
  };

  register = ({ username, email, password }) => {
    if (!this.auth0) {
      return false;
    }

    this.auth0.signup(
      {
        connection: 'Username-Password-Authentication',
        username,
        email,
        password
      },
      err => {
        if (err) return alert('Something went wrong: ' + err.message);
        return alert('success signup without login!');

        // this.handleAuthentication();
      }
    );
  };

  handleAuthentication = () => {
    if (!this.auth0) {
      return false;
    }

    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace('/dashboard');
      } else if (err) {
        // history.replace('/login');
        console.error(err);
      }
    });
  };

  setSession = authResult => {
    if (authResult && authResult.accessToken && authResult.idToken) {
      // Set the time that the access token will expire at
      let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
      localStorage.setItem('auth0:access_token', authResult.accessToken);
      localStorage.setItem('auth0:id_token', authResult.idToken);
      localStorage.setItem('auth0:expires_at', expiresAt);
      localStorage.setItem('auth0:id_token:sub', authResult.idTokenPayload.sub);
    }
  };

  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('auth0:access_token');
    localStorage.removeItem('auth0:id_token');
    localStorage.removeItem('auth0:expires_at');
    localStorage.removeItem('auth0:id_token:sub');
    // navigate to the home route
    history.replace('/login');
  };

  isAuthenticated = () => {
    if (!this.auth0) {
      return false;
    }
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('auth0:expires_at'));
    const isNotExpired = new Date().getTime() < expiresAt;
    if (isNotExpired) {
      return true;
    } else {
      this.logout();
      return false;
    }
  };

  getUserData = () => {
    return new Promise((resolve, reject) => {
      const tokenData = this.getTokenData();
      const { sub: userId } = tokenData;

      const auth0UserUrl = 'https://' + AUTH_CONFIG.domain + '/api/v2/users/' + userId;

      axios
        .get(auth0UserUrl, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + this.getAccessToken()
          }
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          // handle error
          console.warn('Cannot retrieve user data', error);
          reject(error);
        });
    });
  };

  updateUserData = user_metadata => {
    const tokenData = this.getTokenData();
    const { sub: userId } = tokenData;

    const auth0UserUrl = 'https://' + AUTH_CONFIG.domain + '/api/v2/users/' + userId;
    const dataObj = JSON.stringify({ user_metadata });

    return axios.patch(auth0UserUrl, dataObj, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getAccessToken()
      }
    });
  };

  getAccessToken = () => {
    return localStorage.getItem('access_token');
  };

  getIdToken = () => {
    return window.localStorage.getItem('id_token');
  };

  getTokenData = () => {
    const token = this.getIdToken();
    const decoded = jwtDecode(token);
    if (!decoded) {
      return null;
    }
    return decoded;
  };
}

const instance = new auth0Service();

export default instance;
