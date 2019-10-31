import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import App from 'components/App/index';
import * as serviceWorker from 'serviceWorker';
import { createStore } from 'redux';
import allReducers from 'reducers';
import { Provider } from 'react-redux';
require('dotenv').config(); // Enable dot-env configurations

// Create Redux Store
const store = createStore(
  allReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// Set Redux Provider to provide for entire App
const AppWithStore = (
  <Provider store={store}>
    <App/>
  </Provider>
);

// Render App
ReactDOM.render(AppWithStore, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
