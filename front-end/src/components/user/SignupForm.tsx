import * as React from 'react';

interface State {
    username: string;
    password1: string;
    password2: string;
    name: string;
}

export class SignupForm extends React.Component<{}, State> {
    render() {
        return (
            <div>signupform</div>
        );
    }
}
