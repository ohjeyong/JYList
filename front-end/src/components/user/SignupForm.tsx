import * as React from 'react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';

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
}

export class SignupForm extends React.Component<Props, State> {
    readonly state: Readonly<State> = {
        username: '',
        password1: '',
        password2: '',
        name: '',
    };

    onChange = (key: keyof State) => (e: React.FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        // tslint:disable-next-line:no-any
        this.setState({ [key as any]: value });
    }

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { username, password1, password2, name } = this.state;
        this.props.onSubmit(username, password1, password2, name);
    }

    onChangeForm = () => {
        this.props.onChangeForm();
    }

    render() {
        const { username, password1, password2, name } = this.state;
        console.log(this.props.signupError);
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
                    value={name}
                    onChange={this.onChange('name')}
                    label="이름"
                    type="password"
                    fullWidth={true}
                />
                <TextField
                    className="LoginSignupFormInput"
                    value={password1}
                    onChange={this.onChange('password1')}
                    label="비밀번호"
                    type="password"
                    fullWidth={true}
                />
                <TextField
                    className="LoginSignupFormInput"
                    value={password2}
                    onChange={this.onChange('password2')}
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
                        로그인으로
                    </Button>
                    <Button
                        type="submit"
                        variant="raised"
                        color="primary"
                    >
                        회원가입
                    </Button>
                </div>
            </form>
        );
    }
}