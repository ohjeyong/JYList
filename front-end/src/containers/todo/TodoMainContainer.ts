import { connect } from 'react-redux';
import { TodoMain } from '../../components/todo/TodoMain';
import { RootReducer, TodoState } from '../../reducers';
import { thunksActionCreators } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type StateToProps = Pick<TodoState, 'loadingTodoList' | 'todoList'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'fetchTodoList'>;

export type TodoMain = StateToProps & DispatchToProps;

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

export const TodoMainContainer = connect<StateToProps, DispatchToProps, {}>
(mapStateToProps, mapDispatchToProps)(TodoMain);
