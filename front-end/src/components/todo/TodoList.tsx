import * as React from 'react';
import { TodoLi } from './TodoLi';
import { Todo } from '../../models/todo';

interface Props {
    todoList: Todo[];
    emptyTodoListText?: string;
}

export const TodoList: React.SFC<Props> = (props: Props) => {
    const { todoList, emptyTodoListText } = props;
    if (todoList.length === 0) {
        return (
            <span className="HelpText" style={{margin: 'auto'}}>{emptyTodoListText || 'Todo 가 없습니다.'}</span>
        );
    } else {
        return (
            <ul style={{overflowY: 'auto', flex: 1}}>
                {todoList.map((eachTodo: Todo) => {
                    return (
                        <TodoLi key={eachTodo.id} todo={eachTodo}/>
                    );
                })}
            </ul>
        );
    }
};
