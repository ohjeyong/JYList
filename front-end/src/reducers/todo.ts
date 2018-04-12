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
        default: {
            return state;
        }
    }
};
