import { connect } from 'react-redux';
import { RootReducer, TodoState } from '../../reducers';
import { TodoFormDialog } from '../../components/todo/TodoFormDialog';
import { thunksActionCreators, Actions } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type StateToProps = Pick<TodoState, 'showTodoForm' | 'todoFormLoading' | 'todoFormDialog'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setShowTodoForm' | 'requestCreateTodo' |
    'changeTodoFormDialog'>;
export type TodoFormDialog = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => ({
    showTodoForm: state.todo.showTodoForm,
    todoFormLoading: state.todo.todoFormLoading,
    todoFormDialog: state.todo.todoFormDialog,
});

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        setShowTodoForm: thunksActionCreators.setShowTodoForm,
        requestCreateTodo: thunksActionCreators.requestCreateTodo,
        changeTodoFormDialog: thunksActionCreators.changeTodoFormDialog,
    };
    return bindActionCreators(map, dispatch);
};

export const TodoFormDialogContainer = connect<StateToProps, DispatchToProps>
(mapStateToProps, mapDispatchToProps)(TodoFormDialog);
