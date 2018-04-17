import * as React from 'react';
import { TodoList as Props } from '../../containers/todo/TodoListContainer';
import { TodoLi } from './TodoLi';
import { Todo } from '../../models/todo';

export class TodoList extends React.Component<Props> {
    componentDidMount() {
        this.props.fetchTodoList();
    }

    render() {
        const { todoList } = this.props;
        if (todoList.length === 0) {
            return (
                <span>Todo를 등록해보세요!</span>
            );
        } else {
            return (
                <ul style={{overflowY: 'auto'}}>
                    {todoList.map((eachTodo: Todo) => {
                        return (
                            <TodoLi key={eachTodo.id} todo={eachTodo}/>
                        );
                    })}
                </ul>
            );
        }
    }
}
