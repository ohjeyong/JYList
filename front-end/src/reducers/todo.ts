import * as fromActions from '../actions';
import { Todo } from '../models/todo';

export interface TodoState {
    todoList: Todo[];
    loadingTodoList: boolean;
}

const initialState: TodoState = {
    todoList: [],
    loadingTodoList: false
};

function replaceTodo(oldList: Todo[], todo: Todo) {
    return oldList.map(eachTodo => {
        if (eachTodo.id === todo.id) {
            return todo;
        } else {
            return eachTodo;
        }
    });
}

export const todoReducer = (state: TodoState = initialState, action: fromActions.Actions): TodoState => {
    switch (action.type) {
        case fromActions.ActionTypes.FETCH_TODO_LIST_PENDING: {
            return {
                ...state,
                loadingTodoList: true
            };
        }
        case fromActions.ActionTypes.FETCH_TODO_LIST_FULFILLED: {
            const todoList: Todo[] = [];
            for (let eachTodo of action.payload.data) {
                todoList.push(new Todo(eachTodo));
            }
            return {
                ...state,
                loadingTodoList: false,
                todoList
            };
        }
        case fromActions.ActionTypes.REQUEST_ADD_LIKE: {
            const todo: Todo = new Todo(action.payload.data);
            return {
                ...state,
                todoList: replaceTodo(state.todoList, todo)
            };
        }
        case fromActions.ActionTypes.REQUEST_TODO_REVERT_COMPLETE: {
            const todo: Todo = new Todo(action.payload.data);
            return {
                ...state,
                todoList: replaceTodo(state.todoList, todo)
            };
        }
        default: {
            return state;
        }
    }
};
