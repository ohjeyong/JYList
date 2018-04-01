import { connect } from 'react-redux';
import { AuthRoute } from '../routers/AuthRoute';
import { getLoginUserInfoByToken, setAppLoading } from '../actions';
import { UserState } from '../reducers/user';
import { AppState } from '../reducers/app';
import { RootReducer } from '../reducers';
import { RouteProps } from 'react-router';

type StateToProps = Pick<UserState, 'loginUser'> & Pick<AppState, 'loading'|'errorMessage'>;
interface DispatchToProps {
    getLoginUserInfoByToken: () => void;
    setAppLoading: (value: boolean) => void;
}
type OwnProps = RouteProps;

export type AuthRoute = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loginUser: state.user.loginUser,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage
    };
};

export const AuthRouteContainer =
    connect<StateToProps, DispatchToProps, OwnProps>
    (mapStateToProps, { getLoginUserInfoByToken, setAppLoading })(AuthRoute);
