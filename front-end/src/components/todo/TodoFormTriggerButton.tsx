import * as React from 'react';
import { Button } from '@material-ui/core';
import { TodoFormTriggerButton as Props } from '../../containers/todo/TodoFormTriggerButtonContainer';
import AddIcon from '@material-ui/icons/Add';

export const TodoFormTriggerButton: React.SFC<Props> = (props: Props) => {
    return (
        <Button
            variant="fab"
            onClick={() => props.setShowTodoForm(true)}
            style={{
                zIndex: 1,
                ...props.style
            }}
            color="primary"
        >
            <AddIcon/>
        </Button>
    );
};