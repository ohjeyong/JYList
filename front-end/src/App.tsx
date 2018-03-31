import * as React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise-middleware';
import { rootReducer } from './reducers';
import { JYListIndexContainer } from './containers/JYListIndexContainer';

const store = createStore(rootReducer, applyMiddleware(promiseMiddleware({
    promiseTypeSeparator: '/'
})));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <JYListIndexContainer/>
            </Provider>
        );
    }
}

export default App;
