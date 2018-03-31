import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginSignup } from '../components/user/LoginSignup';
import { TodoIndex } from '../components/todo/TodoIndex';
import { AuthRouteContainer } from '../containers/AuthRouteContainer';

export const JYRoute: React.SFC<{}> = () => (
    <Router>
        <Switch>
            <Route path="/login" component={LoginSignup} />
            <AuthRouteContainer path="/todo" component={TodoIndex} />
        </Switch>
    </Router>
);
