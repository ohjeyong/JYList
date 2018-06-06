import { connect } from 'react-redux';
import { DialogTodoDeleteAlert } from '../../components/todo/DialogTodoDeleteAlert';
import { RootReducer, TodoState } from '../../reducers';
import { thunksActionCreators, Actions } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type StateToProps = Pick<TodoState, 'alertTodoDelete'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setAlertTodoDelete' | 'requestTodoDelete'>;

export type DialogTodoDeleteAlert = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        alertTodoDelete: state.todo.alertTodoDelete,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        setAlertTodoDelete: thunksActionCreators.setAlertTodoDelete,
        requestTodoDelete: thunksActionCreators.requestTodoDelete
    };
    return bindActionCreators(map, dispatch);
};

export const DialogTodoDeleteAlertContainer = connect<StateToProps, DispatchToProps>
(mapStateToProps, mapDispatchToProps)(DialogTodoDeleteAlert);
