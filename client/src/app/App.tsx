import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { create } from 'jss';
import { StylesProvider, jssPreset, createGenerateClassName } from '@material-ui/styles';
import * as fuse from '@fuse';

import history from '@history';
import routes from './fuse-configs/routesConfig';
import AppContext from './AppContext';
import store from './store';
import { Auth } from './auth';

const { FuseAuthorization, FuseLayout, FuseTheme }: any = fuse;

const jss = create({
  ...jssPreset(),
  plugins: [...jssPreset().plugins],
  insertionPoint: document.getElementById('jss-insertion-point')!
});

const generateClassName = createGenerateClassName();

const App: FC = () => {
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
