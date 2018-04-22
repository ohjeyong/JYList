import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { TodoMain as Props } from '../../containers/todo/TodoMainContainer';
import { TodoList } from './TodoList';
import { DialogTodoDeleteAlertContainer } from '../../containers/todo/DialogTodoDeleteAlertContainer';

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
            </React.Fragment>
        );
    }
}
