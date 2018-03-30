import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginSignup from '../components/user/LoginSignup';
import TodoIndex from '../components/todo/TodoIndex';
import { RedirectIfNotLoginContainer } from '../containers/RedirectIfNotLoginContainer';

export const JYRoute: React.SFC<{}> = () => (
    <Router>
        <React.Fragment>
            <RedirectIfNotLoginContainer>
                <Route path="/todo" component={TodoIndex} />
            </RedirectIfNotLoginContainer>
            <Route exact={true} path="/login" component={LoginSignup} />
        </React.Fragment>
    </Router>
);
