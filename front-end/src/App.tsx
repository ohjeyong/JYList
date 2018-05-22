import * as React from 'react';
import { CssBaseline } from '@material-ui/core';
import { Provider } from 'react-redux';
import { JYRoute } from './routers';
import { store } from './store';

export const App: React.SFC<{}> = () => (
    <Provider store={store}>
        <React.Fragment>
            <CssBaseline/>
            <JYRoute/>
        </React.Fragment>
    </Provider>
);

export default App;
