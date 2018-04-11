import * as React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { LoginSignupContainer } from '../containers/user/LoginSignupContainer';
import { TodoIndex } from '../components/todo/TodoIndex';
import { AuthRouteContainer } from '../containers/AuthRouteContainer';

export const JYRoute: React.SFC<{}> = () => (
    <Router>
        <Switch>
            <Route path="/login" component={LoginSignupContainer} />
            <AuthRouteContainer path="/" component={TodoIndex} />
        </Switch>
    </Router>
);
