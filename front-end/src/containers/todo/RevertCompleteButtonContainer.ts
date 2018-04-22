import { connect } from 'react-redux';
import { RevertCompleteButton } from '../../components/todo/RevertCompleteButton';
import { thunksActionCreators } from '../../actions';
import { Todo } from '../../models/todo';
import { bindActionCreators, Dispatch } from 'redux';
import { RootReducer } from '../../reducers';

type DispatchToProps = Pick<typeof thunksActionCreators, 'requestRevertComplete'>;
interface OwnProps {
    todo: Todo;
}

export type RevertCompleteButton = DispatchToProps & OwnProps;

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        requestRevertComplete: thunksActionCreators.requestRevertComplete
    };
    return bindActionCreators(map, dispatch);
};

export const RevertCompleteButtonContainer = connect<null, DispatchToProps, OwnProps>
(null, mapDispatchToProps)(RevertCompleteButton);
