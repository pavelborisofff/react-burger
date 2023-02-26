import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import 'modern-normalize/modern-normalize.css';
import './index.scss';

import App from './components/app/app';
import store from './services';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  // <StrictMode>
    <Provider store={ store }>
      <App />
    </Provider>
  // </StrictMode>
);
