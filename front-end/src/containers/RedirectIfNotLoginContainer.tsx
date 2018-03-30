import { connect } from 'react-redux';
import { RedirectIfNotLogin } from '../components/RedirectIfNotLogin';
import { getLoginUserInfoByToken } from '../actions';
import { UserState } from '../reducers/user';
import { RootReducer } from '../reducers';

type StateToProps = Pick<UserState, 'loginUser' | 'loginLoading'>;
interface DispatchToProps {
    getLoginUserInfoByToken: () => void;
}
interface OwnProps {
}

export type RedirectIfNotLogin = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loginUser: state.user.loginUser,
        loginLoading: state.user.loginLoading
    };
};

export const RedirectIfNotLoginContainer =
    connect<StateToProps, DispatchToProps, {}>(mapStateToProps, { getLoginUserInfoByToken })(RedirectIfNotLogin);
