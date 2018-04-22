import * as React from 'react';
import { Todo } from '../../models/todo';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import { CategoryChip } from './CategoryChip';
import { LikeButtonContainer } from '../../containers/todo/LikeButtonContainer';
import { Tag } from './Tag';
import { TimeAgo } from '../common';
import { RevertCompleteButtonContainer } from '../../containers/todo/RevertCompleteButtonContainer';
import { CompleteButtonContainer } from '../../containers/todo/CompleteButtonContainer';
import { DeleteButtonContainer } from '../../containers/todo/DeleteButtonContainer';

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
                            <div>
                                댓글보기, 작성자, 시간
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
                    {showComments ?
                        <div>
                            댓글
                        </div>
                        : null}
                </Paper>
            </li>
        );
    }
}
