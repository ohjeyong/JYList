import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { rootReducer } from '../reducers';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

middlewares.push(thunkMiddleware);

export const store = createStore(rootReducer, applyMiddleware(...middlewares));
