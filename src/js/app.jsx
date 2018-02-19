import 'babel-polyfill';

import '../styles/vendor.scss';
import '../styles/styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes/routes.jsx';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(<Routes store={store} />, document.getElementById('app'))