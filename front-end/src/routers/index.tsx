import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginSignup from '../components/user/LoginSignup';
import TodoIndex from '../components/todo/TodoIndex';

class JYListIndex extends React.Component<{}> {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Route exact={true} path="/" component={LoginSignup} />
                    <Route path="/todo" component={TodoIndex} />
                </React.Fragment>
            </Router>
        );
    }
}

export default JYListIndex;
