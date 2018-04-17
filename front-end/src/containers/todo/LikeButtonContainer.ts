import { connect } from 'react-redux';
import { thunksActionCreators } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';
import { RootReducer } from '../../reducers';
import { LikeButton } from '../../components/todo/LikeButton';
import { Todo } from '../../models/todo';

type DispatchToProps = Pick<typeof thunksActionCreators, 'requestAddLike'>;
interface OwnProps {
    todo: Todo;
}

export type LikeButton = DispatchToProps & OwnProps;

const mapDispatchToProps = (dispatch: Dispatch<RootReducer>): DispatchToProps => {
    const map: DispatchToProps = {
        requestAddLike: thunksActionCreators.requestAddLike
    };
    return bindActionCreators(map, dispatch);
};

export const LikeButtonContainer =  connect<null, DispatchToProps, OwnProps>(null, mapDispatchToProps)(LikeButton);
