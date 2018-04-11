import * as React from 'react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';
import { LoginSignup as Props } from '../../containers/user/LoginSignupContainer';

export const LoginSignup: React.SFC<Props> = (props: Props) => {
    return (
        <div className="LoginSignup">
            <div className="Header">
                JY List
            </div>
            <div className={`FormWrapper ${props.showSignupForm ? 'SignupForm' : ''}`}>
                {props.showSignupForm ?
                    <SignupForm
                        onChangeForm={() => props.setShowSignupForm(false)}
                        onSubmit={props.signupRequest}
                        signupError={props.signupError}
                    /> :
                    <LoginForm
                        onChangeForm={() => props.setShowSignupForm(true)}
                        showLoginErrorMessage={props.showLoginErrorMessage}
                        loginLoading={props.loginLoading}
                        onSubmit={props.loginRequest}
                        loginUser={props.loginUser}
                    />
                }
            </div>
        </div>
    );
};
