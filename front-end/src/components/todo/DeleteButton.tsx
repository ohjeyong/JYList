import * as React from 'react';
import Button from 'material-ui/Button';
import red from 'material-ui/colors/red';
import { DeleteButton as Props } from '../../containers/todo/DeleteButtonContainer';

export const DeleteButton: React.SFC<Props> = (props: Props) => (
    <Button
        size="small"
        style={{
            color: red[400]
        }}
        onClick={() => props.requestTodoDelete(props.todo.id)}
    >
        삭제
    </Button>
);
