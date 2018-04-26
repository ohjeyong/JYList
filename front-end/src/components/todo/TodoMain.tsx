import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { TodoMain as Props } from '../../containers/todo/TodoMainContainer';
import { TodoList } from './TodoList';
import { DialogTodoDeleteAlertContainer } from '../../containers/todo/DialogTodoDeleteAlertContainer';
import { DialogTodoCommentDeleteAlertContainer } from '../../containers/todo/DialogTodoCommentDeleteAlertContainer';
import { TodoFormTriggerButtonContainer } from '../../containers/todo/TodoFormTriggerButtonContainer';

export class TodoMain extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchTodoList();
    }

    render() {
        const { todoList, loadingTodoList } = this.props;
        if (loadingTodoList) {
            return (
                <CircularProgress style={{margin: 'auto'}}/>
            );
        }
        return (
            <React.Fragment>
                <TodoList
                    todoList={todoList}
                    emptyTodoListText="Todo 를 추가해보세요!"
                />
                <DialogTodoDeleteAlertContainer/>
                <DialogTodoCommentDeleteAlertContainer/>
                <TodoFormTriggerButtonContainer
                    style={{
                        position: 'absolute',
                        bottom: '15px',
                        right: '15px'
                    }}
                />
            </React.Fragment>
        );
    }
}
