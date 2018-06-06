import * as React from 'react';
import { connect } from 'react-redux';
import { TodoFormTriggerButton } from '../../components/todo/TodoFormTriggerButton';
import { thunksActionCreators, Actions } from '../../actions';
import { bindActionCreators, Dispatch } from 'redux';

type DispatchToProps = Pick<typeof thunksActionCreators, 'setShowTodoForm'>;
interface OwnProps {
    style?: React.CSSProperties;
}

export type TodoFormTriggerButton = DispatchToProps & OwnProps;

const mapDispatchToProps = (dispatch: Dispatch<Actions>): DispatchToProps => {
    const map: DispatchToProps = {
        setShowTodoForm: thunksActionCreators.setShowTodoForm
    };
    return bindActionCreators(map, dispatch);
};

export const TodoFormTriggerButtonContainer = connect<null, DispatchToProps, OwnProps>
(null, mapDispatchToProps)(TodoFormTriggerButton);
