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
            <div className="FormWrapper">
                {props.showSignupForm ?
                    <SignupForm/> :
                    <LoginForm
                        onChangeForm={() => props.setShowSignupForm(true)}
                    />
                }
            </div>
        </div>
    );
};
