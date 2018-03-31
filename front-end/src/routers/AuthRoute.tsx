import * as _ from 'lodash';
import * as React from 'react';
import { Redirect, Route } from 'react-router';
import { AuthRoute as Props } from '../containers/AuthRouteContainer';

export const AuthRoute: React.SFC<Props> = props => {
    const user = props.loginUser;
    const token = localStorage.getItem('token');
    if (_.isEmpty(user)) {
        if (token === null) {
            console.log('Token empty. Redirect to login');
            return (
                <Redirect to="/login"/>
            );
        } else {
            console.log('Token exists. Request login');
            props.getLoginUserInfoByToken();
            if (props.loginLoading) {
                return (
                    <div>
                        Loading...
                    </div>
                );
            } else {
                return null;
            }
        }
    } else {
        return <Route {...props} />;
    }
};
