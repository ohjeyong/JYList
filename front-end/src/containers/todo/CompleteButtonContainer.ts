import { connect } from 'react-redux';
import { CompleteButton } from '../../components/todo/CompleteButton';
import { thunksActionCreators } from '../../actions';
import { Todo } from '../../models/todo';
import { bindActionCreators, Dispatch } from 'redux';
import { RootReducer } from '../../reducers';

type DispatchToProps = Pick<typeof thunksActionCreators, 'requestTodoComplete'>;
interface OwnProps {
    todo: Todo;
}

export type CompleteButton = DispatchToProps & OwnProps;

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        requestTodoComplete: thunksActionCreators.requestTodoComplete
    };
    return bindActionCreators(map, dispatch);
};

export const CompleteButtonContainer = connect<null, DispatchToProps, OwnProps>
(null, mapDispatchToProps)(CompleteButton);
