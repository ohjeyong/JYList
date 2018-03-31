import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { rootReducer } from '../reducers';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

middlewares.push(promiseMiddleware({
    promiseTypeDelimiter: '/'
}));

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
