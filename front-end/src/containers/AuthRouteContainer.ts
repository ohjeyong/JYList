import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { AuthRoute } from '../routers/AuthRoute';
import { thunksActionCreators, Actions } from '../actions';
import { RootReducer, UserState, AppState } from '../reducers';
import { RouteProps } from 'react-router';

type StateToProps = Pick<UserState, 'loginUser'> & Pick<AppState, 'loading'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'getLoginUserInfoByToken' | 'setAppLoading'>;
type OwnProps = RouteProps;

export type AuthRoute = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loginUser: state.user.loginUser,
        loading: state.app.loading
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        getLoginUserInfoByToken: thunksActionCreators.getLoginUserInfoByToken,
        setAppLoading: thunksActionCreators.setAppLoading,
    };
    return bindActionCreators(map, dispatch);
};

export const AuthRouteContainer = connect<StateToProps, DispatchToProps, OwnProps>
(mapStateToProps, mapDispatchToProps)(AuthRoute);
