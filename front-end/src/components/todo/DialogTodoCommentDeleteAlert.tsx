import * as React from 'react';
import { Dialog, DialogActions, DialogContent, Button } from '@material-ui/core';
import { DialogTodoCommentDeleteAlert as Props } from '../../containers/todo/DialogTodoCommentDeleteAlertContainer';

export const DialogTodoCommentDeleteAlert: React.SFC<Props> = (props: Props) => (
    <Dialog
        open={props.alertCommentDelete !== null}
        onClose={() => props.setAlertTodoCommentDelete(null)}
    >
        <DialogContent>
            정말 삭제하시겠습니까?
        </DialogContent>
        <DialogActions>
            <Button
                onClick={() => props.setAlertTodoCommentDelete(null)}
            >
                취소
            </Button>
            <Button
                color="secondary"
                onClick={() => props.requestTodoCommentDelete(props.alertCommentDelete!)}
            >
                삭제
            </Button>
        </DialogActions>
    </Dialog>
);
