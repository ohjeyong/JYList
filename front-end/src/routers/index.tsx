import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginSignup } from '../components/user/LoginSignup';
import { TodoIndex } from '../components/todo/TodoIndex';

export const JYRoute: React.SFC<{}> = () => (
    <Router>
        <Switch>
            <Route path="/todo" component={TodoIndex} />
            <Route path="/login" component={LoginSignup} />
        </Switch>
    </Router>
);
