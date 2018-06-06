import { connect } from 'react-redux';
import { TodoCommentForm } from '../../components/todo/TodoCommentForm';
import { RootReducer, TodoState } from '../../reducers';
import { thunksActionCreators, Actions } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';
import { Todo } from '../../models/todo';

type StateToProps = Pick<TodoState, 'commentFormLoading' | 'commentFormError' | 'commentFormValue'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'requestCreateTodoComment' | 'setTodoCommentFormValue'>;

interface OwnProps {
    todo: Todo;
}

export type TodoCommentForm = StateToProps & DispatchToProps & OwnProps;

const mapStateToProps = (state: RootReducer): StateToProps => ({
    commentFormLoading: state.todo.commentFormLoading,
    commentFormError: state.todo.commentFormError,
    commentFormValue: state.todo.commentFormValue,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        requestCreateTodoComment: thunksActionCreators.requestCreateTodoComment,
        setTodoCommentFormValue: thunksActionCreators.setTodoCommentFormValue,
    };
    return bindActionCreators(map, dispatch);
};

export const TodoCommentFormContainer = connect<StateToProps, DispatchToProps, OwnProps>
(mapStateToProps, mapDispatchToProps)(TodoCommentForm);
