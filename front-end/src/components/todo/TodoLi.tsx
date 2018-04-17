import * as React from 'react';
import { Todo } from '../../models/todo';
import Paper from 'material-ui/Paper';
import { CategoryChip } from './CategoryChip';
import { LikeButtonContainer } from '../../containers/todo/LikeButtonContainer';
import { Tag } from './Tag';

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
                            <div>
                                댓글보기, 작성자, 시간
                            </div>
                        </div>
                        <div>
                            완료, 삭제 버튼
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
