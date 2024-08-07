import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, BrowserRouter } from 'react-router-dom';

import 'modern-normalize/modern-normalize.css';
import './index.scss';

import App from './components/app/app';
import store from './services';

const Router = process.env.NODE_ENV === 'production' ? HashRouter : BrowserRouter;


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={ store }>
      <Router>
        <App />
      </Router>
    </Provider>
  </StrictMode>
);
