import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { rootReducer } from './reducers';
import { JYRoute } from './routers';

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
    const { logger } = require('redux-logger');
    middlewares.push(logger);
}

middlewares.push(promiseMiddleware({
    promiseTypeSeparator: '/'
}));

const store = createStore(rootReducer, applyMiddleware(...middlewares));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <JYRoute/>
            </Provider>
        );
    }
}

export default App;
