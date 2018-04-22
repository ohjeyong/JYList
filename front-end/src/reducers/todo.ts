import * as fromActions from '../actions';
import { Todo } from '../models/todo';

export interface TodoState {
    todoList: Todo[];
    loadingTodoList: boolean;
    alertTodoDelete: Todo | null;
}

const initialState: TodoState = {
    todoList: [],
    loadingTodoList: false,
    alertTodoDelete: null,
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
        case fromActions.ActionTypes.REQUEST_TODO_COMPLETE: {
            const todo: Todo = new Todo(action.payload.data);
            return {
                ...state,
                todoList: replaceTodo(state.todoList, todo)
            };
        }
        case fromActions.ActionTypes.REQUEST_TODO_DELETE: {
            const todoList = state.todoList.filter((todo: Todo) => todo.id !== action.payload.data.id);
            return {
                ...state,
                todoList,
                alertTodoDelete: null
            };
        }
        case fromActions.ActionTypes.SET_ALERT_TODO_DELETE: {
            return {
                ...state,
                alertTodoDelete: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
