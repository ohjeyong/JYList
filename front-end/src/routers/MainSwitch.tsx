import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TodoList } from '../components/todo/TodoList';
import { MyPage } from '../components/user/MyPage';
import { NotFound404 } from '../components/NotFound404';

export const MainSwitch: React.SFC<{}> = () => (
    <Switch>
        <Route exact={true} path="/" component={TodoList}/>
        <Route exact={true} path="/mypage" component={MyPage}/>
        <Route path="/" component={NotFound404} />
    </Switch>
);