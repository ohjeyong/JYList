import { connect } from 'react-redux';
import { TodoList } from '../../components/todo/TodoList';
import { RootReducer, TodoState } from '../../reducers';
import { thunksActionCreators } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type StateToProps = Pick<TodoState, 'loadingTodoList' | 'todoList'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'fetchTodoList'>;

export type TodoList = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        loadingTodoList: state.todo.loadingTodoList,
        todoList: state.todo.todoList
    };
};

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        fetchTodoList: thunksActionCreators.fetchTodoList
    };
    return bindActionCreators(map, dispatch);
};

export const TodoListContainer = connect<StateToProps, DispatchToProps, {}>
(mapStateToProps, mapDispatchToProps)(TodoList);
