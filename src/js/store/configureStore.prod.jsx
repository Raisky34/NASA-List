import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import api from '../middleware/api';
import localizeApi from '../middleware/localizeApi';
import rootReducer from '../reducers';

const middlewareRouter = routerMiddleware(browserHistory);

export default function configureStore(preloadedState) {
    return createStore(
        rootReducer,
        preloadedState,
        applyMiddleware(thunk, api, localizeApi, apiMiddleware, middlewareRouter)
    )
}
