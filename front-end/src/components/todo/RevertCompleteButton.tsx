import * as React from 'react';
import Button from 'material-ui/Button';
import orange from 'material-ui/colors/orange';
import { RevertCompleteButton as Props } from '../../containers/todo/RevertCompleteButtonContainer';

export const RevertCompleteButton: React.SFC<Props> = (props: Props) => (
    <Button
        size="small"
        style={{
            color: orange[500]
        }}
        onClick={() => props.requestTodoRevertComplete(props.todo.id)}
    >
        되돌리기
    </Button>
);
