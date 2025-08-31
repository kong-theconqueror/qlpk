import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { history } from './helpers/history';
import PublicRoutes from './routers';
import { ToastContainer } from 'react-toastify';
import i18nService from './services/i18n';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'react-bootstrap';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

function App() {

  return (
    <div className="app">
      <I18nextProvider i18n={i18nService}>
        <Provider store={store}>
          <ThemeProvider>
            <PublicRoutes history={history} />
            <ToastContainer />
          </ThemeProvider>
        </Provider>
      </I18nextProvider>
    </div>
  );
}

export default App;
