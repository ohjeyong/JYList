import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AuthRoute } from '../routers/AuthRoute';
import { thunksActionCreators } from '../actions';
import { UserState } from '../reducers/user';
import { AppState } from '../reducers/app';
import { RootReducer } from '../reducers';
import { RouteProps } from 'react-router';

type StateToProps = Pick<UserState, 'loginUser'> & Pick<AppState, 'loading'|'errorMessage'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'getLoginUserInfoByToken' | 'setAppLoading'>;
type OwnProps = RouteProps;

export type AuthRoute = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loginUser: state.user.loginUser,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        getLoginUserInfoByToken: thunksActionCreators.getLoginUserInfoByToken,
        setAppLoading: thunksActionCreators.setAppLoading,
    };
    return bindActionCreators(map, dispatch);
};

export const AuthRouteContainer = connect<StateToProps, DispatchToProps, OwnProps>
(mapStateToProps, mapDispatchToProps)(AuthRoute);
