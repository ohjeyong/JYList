import { connect } from 'react-redux';
import { LoginSignup } from '../../components/user/LoginSignup';
import { UserState, RootReducer } from '../../reducers';
import { thunksActionCreators } from '../../actions';
import { Dispatch, bindActionCreators } from 'redux';

type StateToProps = Pick<UserState,
    'showSignupForm' | 'showLoginErrorMessage' | 'loginLoading' | 'loginUser' | 'signupLoading' | 'signupError'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setAppErrorMessage'
 | 'setShowSignupForm' | 'setShowLoginErrorMessage' | 'loginRequest' | 'signupRequest'>;
export type LoginSignup = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        showSignupForm: state.user.showSignupForm,
        showLoginErrorMessage: state.user.showLoginErrorMessage,
        loginLoading: state.user.loginLoading,
        loginUser: state.user.loginUser,
        signupLoading: state.user.signupLoading,
        signupError: state.user.signupError
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>) => {
    const map = {
        setAppErrorMessage: thunksActionCreators.setAppErrorMessage,
        setShowSignupForm: thunksActionCreators.setShowSignupForm,
        setShowLoginErrorMessage: thunksActionCreators.setShowLoginErrorMessage,
        loginRequest: thunksActionCreators.loginRequest,
        signupRequest: thunksActionCreators.signupRequest
    };
    return bindActionCreators(map, dispatch);
};

export const LoginSignupContainer = connect<StateToProps, DispatchToProps, null>
(mapStateToProps, mapDispatchToProps)(LoginSignup);
