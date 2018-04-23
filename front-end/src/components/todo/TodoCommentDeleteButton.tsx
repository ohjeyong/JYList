import * as React from 'react';
import { TodoCommentDeleteButton as Props } from '../../containers/todo/TodoCommentDeleteButtonContainer';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { User } from '../../models/user';

export const TodoCommentDeleteButton: React.SFC<Props> = (props: Props) => {
    const loginUser = props.loginUser as User;
    const comment = props.comment;
    return (
        <IconButton
            onClick={() => props.setAlertTodoCommentDelete(comment)}
            style={{
                height: '24px'
            }}
            disabled={loginUser.id !== comment.author.id}
        >
            <DeleteIcon/>
        </IconButton>
    );
};
