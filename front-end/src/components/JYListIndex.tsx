import * as _ from 'lodash';
import * as React from 'react';
import { Redirect } from 'react-router';
import { RedirectIfNotLogin as PropTypes } from '../containers/JYListIndexContainer';

export class JYListIndex extends React.Component<PropTypes> {
    render() {
        if (this.props.loginLoading) {
            return (
                <span>Loading...</span>
            );
        }
        const user = this.props.loginUser;
        if (_.isEmpty(user)) {
            return (
                <Redirect to="/login"/>
            );
        } else {
            return (
                <React.Fragment>
                    {this.props.children}
                </React.Fragment>
            );
        }
    }
}
