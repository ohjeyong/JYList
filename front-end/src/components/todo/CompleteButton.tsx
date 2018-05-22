import * as React from 'react';
import { Button } from '@material-ui/core';
import { CompleteButton as Props } from '../../containers/todo/CompleteButtonContainer';
import { Todo } from '../../models/todo';

export const CompleteButton: React.SFC<Props> = (props: Props) => (
    <Button
        size="small"
        style={{
            color: Todo.GetCompleteColor()
        }}
        onClick={() => props.requestTodoComplete(props.todo.id)}
    >
        완료
    </Button>
);
