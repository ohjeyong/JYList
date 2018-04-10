import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

interface State {
    username: string;
    password: string;
}

export class LoginForm extends React.Component<{}, State> {
    readonly state: Readonly<State> = {
        username: '',
        password: ''
    };

    onChange = (key: keyof State) => (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        // tslint:disable-next-line:no-any
        this.setState({ [key as any]: value });
    }

    onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
    }

    render() {
        const { username, password } = this.state;
        return (
            <form className="LoginForm">
                <TextField
                    className="LoginFormInput"
                    value={username}
                    onChange={this.onChange('username')}
                    label="아이디"
                    autoFocus={true}
                    fullWidth={true}
                />
                <TextField
                    className="LoginFormInput"
                    value={password}
                    onChange={this.onChange('password')}
                    label="비밀번호"
                    type="password"
                    fullWidth={true}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        variant="raised"
                        color="secondary"
                    >
                        회원가입
                    </Button>
                    <Button
                        variant="raised"
                        color="primary"
                    >
                        로그인
                    </Button>
                </div>
            </form>
        );
    }
}