import * as React from 'react';
import { MainSwitch } from '../../routers/MainSwitch';
import IconButton from 'material-ui/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import { Link } from 'react-router-dom';

export const TodoIndex: React.SFC<{}> = () => (
    <div className="Todo">
        <div className="Header">
            <Link to="/">
                <span>JY List</span>
            </Link>
            <div>
                <Link to="/mypage">
                    <IconButton>
                        <PersonIcon style={{color: 'white'}}/>
                    </IconButton>
                </Link>
            </div>
        </div>
        <div className="TodoRouterWrapper">
            <MainSwitch/>
        </div>
    </div>
);
