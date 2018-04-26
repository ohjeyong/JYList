import { connect } from 'react-redux';
import { RootReducer, TodoState } from '../../reducers';
import { TodoFormDialog } from '../../components/todo/TodoFormDialog';
import { thunksActionCreators } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type StateToProps = Pick<TodoState, 'showTodoForm'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setShowTodoForm'>;
export type TodoFormDialog = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => ({
    showTodoForm: state.todo.showTodoForm
});

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        setShowTodoForm: thunksActionCreators.setShowTodoForm
    };
    return bindActionCreators(map, dispatch);
};

export const TodoFormDialogContainer = connect<StateToProps, DispatchToProps>
(mapStateToProps, mapDispatchToProps)(TodoFormDialog);
