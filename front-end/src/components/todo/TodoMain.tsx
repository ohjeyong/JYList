import * as React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { TodoMain as Props } from '../../containers/todo/TodoMainContainer';
import { TodoList } from './TodoList';

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
            <TodoList
                todoList={todoList}
                emptyTodoListText="Todo 를 추가해보세요!"
            />
        );
    }
}
