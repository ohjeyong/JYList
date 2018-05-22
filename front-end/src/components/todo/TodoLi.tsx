import * as React from 'react';
import { Todo } from '../../models/todo';
import { Paper, Divider } from '@material-ui/core';
import { CategoryChip } from './CategoryChip';
import { LikeButtonContainer } from '../../containers/todo/LikeButtonContainer';
import { Tag } from './Tag';
import { TimeAgo } from '../common';
import { Comment } from '../../models/todo';
import { RevertCompleteButtonContainer } from '../../containers/todo/RevertCompleteButtonContainer';
import { CompleteButtonContainer } from '../../containers/todo/CompleteButtonContainer';
import { DeleteButtonContainer } from '../../containers/todo/DeleteButtonContainer';
import { TodoCommentDeleteButtonContainer } from '../../containers/todo/TodoCommentDeleteButtonContainer';
import { TodoCommentFormContainer } from '../../containers/todo/TodoCommentFormContainer';

interface State {
    showComments: boolean;
}

interface Props {
    todo: Todo;
}

export class TodoLi extends React.Component<Props, State> {
    readonly state: State = {
        showComments: false
    };

    render() {
        const { todo } = this.props;
        const { showComments } = this.state;
        return (
            <li className="TodoLi">
                <Paper>
                    <div className="TodoLiUpper">
                        <div>
                            <div className="TodoMainContent">
                                <div>
                                    <CategoryChip category={todo.category}/>
                                    <LikeButtonContainer todo={todo}/>
                                </div>
                                <div>
                                    {todo.content}
                                </div>
                                <div>
                                    {todo.tagList.map(eachTag => (
                                        <Tag key={eachTag.id} tag={eachTag}/>
                                    ))}
                                </div>
                            </div>
                            <Divider/>
                            <div className="TodoMainFooter">
                                <div
                                    style={{
                                        cursor: 'pointer',
                                        userSelect: 'none',
                                        WebkitTapHighlightColor: 'transparent'
                                    }}
                                    onClick={() => this.setState({
                                        showComments: !this.state.showComments
                                    })}
                                >
                                    댓글({todo.commentList.length})
                                </div>
                                <div>
                                    <TimeAgo date={todo.createdAt}/>
                                    <span style={{marginLeft: '10px'}}>{todo.author.name}</span>
                                </div>
                            </div>
                        </div>
                        <div className="TodoContentRight">
                            {
                                todo.isCompleted
                                    ?
                                    <React.Fragment>
                                        <div
                                            style={{
                                                color: Todo.GetCompleteColor(),
                                                fontWeight: 'bold',
                                                fontSize: '1.2em'
                                            }}
                                        >
                                            완료
                                        </div>
                                        <TimeAgo
                                            date={todo.completeAt!}
                                            style={{
                                                fontSize: '0.6em',
                                            }}
                                        />
                                        <RevertCompleteButtonContainer todo={todo}/>
                                    </React.Fragment>
                                    :
                                    <React.Fragment>
                                        <CompleteButtonContainer todo={todo}/>
                                        <DeleteButtonContainer todo={todo}/>
                                    </React.Fragment>
                            }
                        </div>
                    </div>
                    {
                        showComments
                        ?
                            <div className="TodoLiLower">
                                {
                                    todo.commentList.length === 0
                                    ?
                                        null
                                    :
                                        <ul>
                                            {todo.commentList.map((comment: Comment) => (
                                                <li
                                                    key={comment.id}
                                                >
                                                    <div>
                                                        <div
                                                            style={{
                                                                margin: '6px 14px'
                                                            }}
                                                        >
                                                            <div>
                                                                <span
                                                                    style={{
                                                                        fontWeight: 'bold',
                                                                        marginRight: '5px'
                                                                    }}
                                                                >
                                                                    {comment.author.name}
                                                                </span>
                                                                <TimeAgo
                                                                    date={comment.createdAt}
                                                                    style={{
                                                                        fontSize: '0.9em'
                                                                    }}
                                                                />
                                                            </div>
                                                            <div
                                                                style={{
                                                                    fontSize: '0.9em',
                                                                    marginTop: '3px'
                                                                }}
                                                            >
                                                                {comment.content}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <TodoCommentDeleteButtonContainer comment={comment}/>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                }
                                <TodoCommentFormContainer
                                    todo={todo}
                                />
                            </div>
                        :
                            null
                    }
                </Paper>
            </li>
        );
    }
}
