import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {App} from './Routes/App'

import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux'
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
