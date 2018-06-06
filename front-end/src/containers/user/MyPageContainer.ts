import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { thunksActionCreators, Actions } from '../../actions';
import { RootReducer, UserState } from '../../reducers';
import { MyPage } from '../../components/user/MyPage';

type StateToProps = Pick<UserState, 'loginUser'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'logoutRequest'>;

export type MyPage = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loginUser: state.user.loginUser
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        logoutRequest: thunksActionCreators.logoutRequest
    };
    return bindActionCreators(map, dispatch);
};

export const MyPageContainer = connect<StateToProps, DispatchToProps>(mapStateToProps, mapDispatchToProps)(MyPage);
