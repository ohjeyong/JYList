import * as _ from 'lodash';
import * as React from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { TextInputControl } from '../common';
import { User } from '../../models/user';
import { Redirect } from 'react-router';

interface State {
    username: string;
    password1: string;
    password2: string;
    name: string;
}

interface Props {
    onChangeForm: () => void;
    onSubmit: (username: string, password1: string, password2: string, name: string) => void;
    signupError: object;
    signupLoading: boolean;
    loginUser: User | {};
}

export class SignupForm extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        username: '',
        password1: '',
        password2: '',
        name: '',
    };

    onChange = (key: keyof State) => (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        // tslint:disable-next-line:no-any
        this.setState({ [key as any]: value });
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password1, password2, name } = this.state;
        this.props.onSubmit(username, password1, password2, name);
    }

    render() {
        const { signupLoading, signupError, onChangeForm, loginUser } = this.props;
        if (!_.isEmpty(loginUser)) {
            return <Redirect to="/"/>;
        }
        const { username, password1, password2, name } = this.state;
        return (
            <form className="LoginSignupForm" onSubmit={this.onSubmit}>
                <TextInputControl
                    className="LoginSignupFormInput"
                    errorObject={signupError}
                    name="username"
                    value={username}
                    onChange={this.onChange('username')}
                    autoFocus={true}
                    fullWidth={true}
                    label="아이디"
                />
                <TextInputControl
                    className="LoginSignupFormInput"
                    errorObject={signupError}
                    name="name"
                    value={name}
                    onChange={this.onChange('name')}
                    fullWidth={true}
                    label="이름"
                />
                <TextInputControl
                    className="LoginSignupFormInput"
                    errorObject={signupError}
                    name="password1"
                    value={password1}
                    onChange={this.onChange('password1')}
                    fullWidth={true}
                    label="비밀번호"
                    type="password"
                />
                <TextInputControl
                    className="LoginSignupFormInput"
                    errorObject={signupError}
                    name="password2"
                    value={password2}
                    onChange={this.onChange('password2')}
                    fullWidth={true}
                    label="비밀번호 재입력"
                    type="password"
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: '20px'
                    }}
                >
                    <Button
                        variant="raised"
                        color="secondary"
                        onClick={onChangeForm}
                    >
                        로그인으로
                    </Button>
                    <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        disabled={signupLoading}
                    >
                        {signupLoading ? <CircularProgress size={20}/> : '회원가입'}
                    </Button>
                </div>
            </form>
        );
    }
}