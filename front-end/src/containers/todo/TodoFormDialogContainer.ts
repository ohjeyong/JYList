import { connect } from 'react-redux';
import { RootReducer, TodoState } from '../../reducers';
import { TodoFormDialog } from '../../components/todo/TodoFormDialog';
import { thunksActionCreators } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type StateToProps = Pick<TodoState, 'showTodoForm' | 'todoFormLoading'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setShowTodoForm' | 'requestCreateTodo'>;
export type TodoFormDialog = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => ({
    showTodoForm: state.todo.showTodoForm,
    todoFormLoading: state.todo.todoFormLoading
});

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        setShowTodoForm: thunksActionCreators.setShowTodoForm,
        requestCreateTodo: thunksActionCreators.requestCreateTodo
    };
    return bindActionCreators(map, dispatch);
};

export const TodoFormDialogContainer = connect<StateToProps, DispatchToProps>
(mapStateToProps, mapDispatchToProps)(TodoFormDialog);
