import * as React from 'react';
import { Provider } from 'react-redux';
import { JYRoute } from './routers';
import { store } from './store';

export const App: React.SFC<{}> = () => (
    <Provider store={store}>
        <JYRoute/>
    </Provider>
);

export default App;
