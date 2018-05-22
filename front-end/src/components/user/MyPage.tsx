import * as React from 'react';
import { MyPage as Props } from '../../containers/user/MyPageContainer';
import { User } from '../../models/user';
import { Avatar, Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';

export const MyPage: React.SFC<Props> = (props: Props) => {
    const loginUser = props.loginUser as User;
    return (
        <div className="MyPage">
            <div className="MyPageInner">
                <div className="MyPageContent">
                    <Avatar>
                        <PersonIcon/>
                    </Avatar>
                    <div>
                        <div>{loginUser.username}</div>
                        <div>{loginUser.name}</div>
                    </div>
                </div>
                <div>
                    <Button
                        variant="raised"
                        onClick={() => props.logoutRequest()}
                    >
                        로그아웃
                    </Button>
                </div>
            </div>
        </div>
    );
};
