import * as React from 'react';
import { TodoList as Props } from '../../containers/todo/TodoListContainer';

export class TodoList extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchTodoList();
    }

    render() {
        console.log(this.props.todoList);
        return (
            <div>
                TodoList
            </div>
        );
    }
}
