import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

interface State {
    username: string;
    password: string;
}

interface Props {
    onChangeForm: () => void;
}

export class LoginForm extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        username: '',
        password: ''
    };

    onChange = (key: keyof State) => (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        // tslint:disable-next-line:no-any
        this.setState({ [key as any]: value });
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('asdf');
    }

    onChangeForm = () => {
        this.props.onChangeForm();
    }

    render() {
        const { username, password } = this.state;
        return (
            <form className="LoginForm" onSubmit={this.onSubmit}>
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
                        alignItems: 'center',
                        marginTop: '20px'
                    }}
                >
                    <Button
                        variant="raised"
                        color="secondary"
                        onClick={this.onChangeForm}
                    >
                        회원가입
                    </Button>
                    <Button
                        type="submit"
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