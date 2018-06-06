import { connect } from 'react-redux';
import { DeleteButton } from '../../components/todo/DeleteButton';
import { thunksActionCreators, Actions } from '../../actions';
import { Todo } from '../../models/todo';
import { bindActionCreators, Dispatch } from 'redux';

type DispatchToProps = Pick<typeof thunksActionCreators, 'setAlertTodoDelete'>;
interface OwnProps {
    todo: Todo;
}

export type DeleteButton = DispatchToProps & OwnProps;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        setAlertTodoDelete: thunksActionCreators.setAlertTodoDelete
    };
    return bindActionCreators(map, dispatch);
};

export const DeleteButtonContainer = connect<null, DispatchToProps, OwnProps>
(null, mapDispatchToProps)(DeleteButton);
