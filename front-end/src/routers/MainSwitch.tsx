import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { TodoMainContainer } from '../containers/todo/TodoMainContainer';
import { MyPageContainer } from '../containers/user/MyPageContainer';
import { NotFound404 } from '../components/NotFound404';

export const MainSwitch: React.SFC<{}> = () => (
    <Switch>
        <Route exact={true} path="/" component={TodoMainContainer}/>
        <Route exact={true} path="/mypage" component={MyPageContainer}/>
        <Route path="/" component={NotFound404} />
    </Switch>
);
