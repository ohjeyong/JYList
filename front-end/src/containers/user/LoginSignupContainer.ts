import { connect } from 'react-redux';
import { LoginSignup } from '../../components/user/LoginSignup';
import { UserState, AppState, RootReducer } from '../../reducers';

type StateToProps = Pick<UserState, 'showSignupForm'> & Pick<AppState, 'loading'|'errorMessage'>;
export type LoginSignup = StateToProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        showSignupForm: state.user.showSignupForm,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage
    };
};

export const LoginSignupContainer = connect<StateToProps, null, null>
(mapStateToProps)(LoginSignup);
