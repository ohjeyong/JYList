import * as React from 'react';
import { Provider } from 'react-redux';
import { JYRoute } from './routers';
import { store } from './store';

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
