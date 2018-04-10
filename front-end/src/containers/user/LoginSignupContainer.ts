import { connect } from 'react-redux';
import { LoginSignup } from '../../components/user/LoginSignup';
import { UserState, AppState, RootReducer } from '../../reducers';
import { thunksActionCreators } from '../../actions';
import { Dispatch, bindActionCreators } from 'redux';

type StateToProps = Pick<UserState, 'showSignupForm'> & Pick<AppState, 'loading'|'errorMessage'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setAppErrorMessage' | 'setShowSignupForm'>;
export type LoginSignup = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        showSignupForm: state.user.showSignupForm,
        loading: state.app.loading,
        errorMessage: state.app.errorMessage
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>) => {
    const map = {
        setAppErrorMessage: thunksActionCreators.setAppErrorMessage,
        setShowSignupForm: thunksActionCreators.setShowSignupForm
    };
    return bindActionCreators(map, dispatch);
};

export const LoginSignupContainer = connect<StateToProps, DispatchToProps, null>
(mapStateToProps, mapDispatchToProps)(LoginSignup);
