import * as React from 'react';
import { FuseAuthorization, FuseLayout, FuseTheme } from '@fuse';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from '@history';
import { Auth } from './auth';
import store from './store';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import { create } from 'jss';
import { StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/styles';

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins],
  insertionPoint: document.getElementById('jss-insertion-point')!
});

const generateClassName = createGenerateClassName();

const App = () => {
  return (
    <AppContext.Provider
      value={{
        routes
      }}
    >
      <StylesProvider jss={jss} generateClassName={generateClassName}>
        <Provider store={store}>
          <Auth>
            <Router history={history}>
              <FuseAuthorization>
                <FuseTheme>
                  <FuseLayout />
                </FuseTheme>
              </FuseAuthorization>
            </Router>
          </Auth>
        </Provider>
      </StylesProvider>
    </AppContext.Provider>
  );
};

export default App;
