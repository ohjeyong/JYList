import { connect } from 'react-redux';
import { TodoCommentDeleteButton } from '../../components/todo/TodoCommentDeleteButton';
import { thunksActionCreators } from '../../actions';
import { Comment } from '../../models/todo';
import { bindActionCreators, Dispatch } from 'redux';
import { RootReducer, UserState } from '../../reducers';

type StateToProps = Pick<UserState, 'loginUser'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setAlertTodoCommentDelete'>;
interface OwnProps {
    comment: Comment;
}

export type TodoCommentDeleteButton = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => ({
    loginUser: state.user.loginUser
});

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        setAlertTodoCommentDelete: thunksActionCreators.setAlertTodoCommentDelete
    };
    return bindActionCreators(map, dispatch);
};

export const TodoCommentDeleteButtonContainer = connect<StateToProps, DispatchToProps, OwnProps>
(mapStateToProps, mapDispatchToProps)(TodoCommentDeleteButton);
