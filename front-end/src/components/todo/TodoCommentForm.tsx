import * as _ from 'lodash';
import * as React from 'react';
import { TodoCommentForm as Props } from '../../containers/todo/TodoCommentFormContainer';
import { CircularProgress } from '@material-ui/core';
import { red } from '@material-ui/core/colors';

export const TodoCommentForm: React.SFC<Props> = (props: Props) => (
    <div className="TodoCommentForm">
        <form
            onSubmit={
                (e: React.FormEvent<HTMLFormElement>) => {
                    e.preventDefault();
                    props.requestCreateTodoComment(props.todo.id, props.commentFormValue);
                }
            }
        >
            <input
                type="text"
                value={props.commentFormValue}
                onChange={
                    (e: React.FormEvent<HTMLInputElement>) => props.setTodoCommentFormValue(e.currentTarget.value)
                }
            />
            <button
                type="submit"
                disabled={props.commentFormLoading}
            >
                {
                    props.commentFormLoading
                    ?
                        <CircularProgress
                            size="11px"
                        />
                    :
                        '쓰기'
                }
            </button>
        </form>
        {
            _.isEmpty(props.commentFormError)
                ?
                null
                :
                <div
                    style={{color: red[500], fontSize: '0.8em', padding: '4px 14px'}}
                >
                    {props.commentFormError.content![0]}
                </div>
        }
    </div>
);
