import { connect } from 'react-redux';
import { AuthRoute } from '../routers/AuthRoute';
import { getLoginUserInfoByToken } from '../actions';
import { UserState } from '../reducers/user';
import { AppState } from '../reducers/app';
import { RootReducer } from '../reducers';
import { RouteProps } from 'react-router';

type StateToProps = Pick<UserState, 'loginUser'> & Pick<AppState, 'loading'>;
interface DispatchToProps {
    getLoginUserInfoByToken: () => void;
}
type OwnProps = RouteProps;

export type AuthRoute = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loginUser: state.user.loginUser,
        loading: state.app.loading
    };
};

export const AuthRouteContainer =
    connect<StateToProps, DispatchToProps, OwnProps>(mapStateToProps, { getLoginUserInfoByToken })(AuthRoute);
