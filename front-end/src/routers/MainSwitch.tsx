import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TodoListContainer } from '../containers/todo/TodoListContainer';
import { MyPageContainer } from '../containers/user/MyPageContainer';
import { NotFound404 } from '../components/NotFound404';

export const MainSwitch: React.SFC<{}> = () => (
    <Switch>
        <Route exact={true} path="/" component={TodoListContainer}/>
        <Route exact={true} path="/mypage" component={MyPageContainer}/>
        <Route path="/" component={NotFound404} />
    </Switch>
);
