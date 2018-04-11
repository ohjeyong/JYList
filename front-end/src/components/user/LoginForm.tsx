import * as _ from 'lodash';
import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { red } from 'material-ui/colors';
import { User } from '../../models/user';
import { Redirect } from 'react-router';

interface State {
    username: string;
    password: string;
}

interface Props {
    onChangeForm: () => void;
    showLoginErrorMessage: boolean;
    loginLoading: boolean;
    onSubmit: (username: string, password: string) => void;
    loginUser: User | {};
}

export class LoginForm extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        username: '',
        password: '',
    };

    onChange = (key: keyof State) => (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        // tslint:disable-next-line:no-any
        this.setState({ [key as any]: value });
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.props.onSubmit(this.state.username, this.state.password);
    }

    render() {
        const { username, password } = this.state;
        const { loginLoading, showLoginErrorMessage, loginUser, onChangeForm } = this.props;
        if (!_.isEmpty(loginUser)) {
            return <Redirect to="/"/>;
        }
        return (
            <form className="LoginSignupForm" onSubmit={this.onSubmit}>
                <TextField
                    className="LoginSignupFormInput"
                    value={username}
                    onChange={this.onChange('username')}
                    label="아이디"
                    autoFocus={true}
                    fullWidth={true}
                />
                <TextField
                    className="LoginSignupFormInput"
                    value={password}
                    onChange={this.onChange('password')}
                    label="비밀번호"
                    type="password"
                    fullWidth={true}
                />
                {showLoginErrorMessage ?
                    <div style={{textAlign: 'center', fontSize: '0.8em', color: red[500]}}>
                        아이디 혹은 비밀번호가 올바르지 않습니다.
                    </div>
                    : null}
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
                        회원가입
                    </Button>
                    <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                        disabled={loginLoading}
                    >
                        {loginLoading ? <CircularProgress size={20}/> : '로그인'}
                    </Button>
                </div>
            </form>
        );
    }
}