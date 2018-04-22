import { connect } from 'react-redux';
import { DeleteButton } from '../../components/todo/DeleteButton';
import { thunksActionCreators } from '../../actions';
import { Todo } from '../../models/todo';
import { bindActionCreators, Dispatch } from 'redux';
import { RootReducer } from '../../reducers';

type DispatchToProps = Pick<typeof thunksActionCreators, 'requestTodoDelete'>;
interface OwnProps {
    todo: Todo;
}

export type DeleteButton = DispatchToProps & OwnProps;

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        requestTodoDelete: thunksActionCreators.requestTodoDelete
    };
    return bindActionCreators(map, dispatch);
};

export const DeleteButtonContainer = connect<null, DispatchToProps, OwnProps>
(null, mapDispatchToProps)(DeleteButton);
