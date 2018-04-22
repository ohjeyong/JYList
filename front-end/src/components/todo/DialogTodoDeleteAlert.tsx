import * as React from 'react';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';
import { DialogTodoDeleteAlert as Props } from '../../containers/todo/DialogTodoDeleteAlertContainer';
import Button from 'material-ui/Button';

export const DialogTodoDeleteAlert: React.SFC<Props> = (props: Props) => (
    <Dialog
        open={props.alertTodoDelete !== null}
        onClose={() => props.setAlertTodoDelete(null)}
    >
        <DialogContent>
            정말 삭제하시겠습니까?
        </DialogContent>
        <DialogActions>
            <Button
                onClick={() => props.setAlertTodoDelete(null)}
            >
                취소
            </Button>
            <Button
                color="secondary"
                onClick={() => props.requestTodoDelete(props.alertTodoDelete!.id)}
            >
                삭제
            </Button>
        </DialogActions>
    </Dialog>
);
