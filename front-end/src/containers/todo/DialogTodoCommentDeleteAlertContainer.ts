import { connect } from 'react-redux';
import { DialogTodoCommentDeleteAlert } from '../../components/todo/DialogTodoCommentDeleteAlert';
import { RootReducer, TodoState } from '../../reducers';
import { thunksActionCreators, Actions } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type StateToProps = Pick<TodoState, 'alertCommentDelete'>;
type DispatchToProps = Pick<typeof thunksActionCreators, 'setAlertTodoCommentDelete' | 'requestTodoCommentDelete'>;

export type DialogTodoCommentDeleteAlert = StateToProps & DispatchToProps;

const mapStateToProps = (state: RootReducer): StateToProps => {
    return {
        alertCommentDelete: state.todo.alertCommentDelete,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        setAlertTodoCommentDelete: thunksActionCreators.setAlertTodoCommentDelete,
        requestTodoCommentDelete: thunksActionCreators.requestTodoCommentDelete
    };
    return bindActionCreators(map, dispatch);
};

export const DialogTodoCommentDeleteAlertContainer = connect<StateToProps, DispatchToProps>
(mapStateToProps, mapDispatchToProps)(DialogTodoCommentDeleteAlert);
