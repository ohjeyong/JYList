import { connect } from 'react-redux';
import { AuthRoute } from '../routers/AuthRoute';
import { getLoginUserInfoByToken } from '../actions';
import { UserState } from '../reducers/user';
import { RootReducer } from '../reducers';
import { RouteProps } from 'react-router';

type StateToProps = Pick<UserState, 'loginUser' | 'loginLoading'>;
interface DispatchToProps {
    getLoginUserInfoByToken: () => void;
}
type OwnProps = RouteProps;

export type AuthRoute = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loginUser: state.user.loginUser,
        loginLoading: state.user.loginLoading
    };
};

export const AuthRouteContainer =
    connect<StateToProps, DispatchToProps, OwnProps>(mapStateToProps, { getLoginUserInfoByToken })(AuthRoute);
