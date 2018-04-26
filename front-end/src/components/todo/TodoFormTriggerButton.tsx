import * as React from 'react';
import { TodoFormTriggerButton as Props } from '../../containers/todo/TodoFormTriggerButtonContainer';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';

export const TodoFormTriggerButton: React.SFC<Props> = (props: Props) => {
    return (
        <Button
            variant="fab"
            onClick={() => props.setShowTodoForm(true)}
            style={{
                ...props.style
            }}
            color="primary"
        >
            <AddIcon/>
        </Button>
    );
};