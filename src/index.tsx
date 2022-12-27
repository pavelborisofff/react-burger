import React from 'react';
import ReactDOM from 'react-dom/client';

import 'modern-normalize/modern-normalize.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/box.css';
import '@ya.praktikum/react-developer-burger-ui-components/dist/ui/fonts/fonts.css';
import './index.css';

import App from './components/app/app';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <App />
);
