import * as _ from 'lodash';
import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { AuthRoute as Props } from '../containers/AuthRouteContainer';
import { getAuthToken } from '../utils/localStorage';

export class AuthRoute extends React.Component<Props> {
    componentDidMount() {
        const user = this.props.loginUser;
        const token = getAuthToken();
        if (_.isEmpty(user) && token !== null) {
            console.log(this.props.getLoginUserInfoByToken());
        }
    }

    render() {
        const loading = this.props.loading;
        if (loading) {
            return (
                <div>
                    Loading ...
                </div>
            );
        }
        const user = this.props.loginUser;
        if (_.isEmpty(user)) {
            return <Redirect to="/login"/>;
        } else {
            return <Route {...this.props} />;
        }
    }
}
