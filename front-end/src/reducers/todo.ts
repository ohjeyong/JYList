import * as fromActions from '../actions';
import { Todo, Comment, Tag as TagModel, Category } from '../models/todo';
import { Tag } from '../containers/todo/TagInputContainer';
import { Error as TodoFormDialogError } from '../components/todo/TodoFormDialog';

export interface TodoState {
    todoList: Todo[];
    loadingTodoList: boolean;
    alertTodoDelete: Todo | null;
    alertCommentDelete: Comment | null;
    commentFormLoading: boolean;
    commentFormValue: string;
    commentFormError: {
        content?: string[]
    };
    showTodoForm: boolean;
    tagSearchLoading: boolean;
    tagSearchResult: TagModel[];
    todoFormLoading: boolean;
    todoFormDialog: {
        category: '' | keyof Category,
        content: string,
        tagList: Tag[],
        error: TodoFormDialogError
    };
}

const initialState: TodoState = {
    todoList: [],
    loadingTodoList: false,
    alertTodoDelete: null,
    alertCommentDelete: null,
    commentFormLoading: false,
    commentFormValue: '',
    commentFormError: {},
    showTodoForm: false,
    tagSearchLoading: false,
    tagSearchResult: [],
    todoFormLoading: false,
    todoFormDialog: {
        category: '',
        content: '',
        tagList: [],
        error: {}
    }
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
        case fromActions.ActionTypes.REQUEST_TODO_COMMENT_DELETE: {
            const { id, todo_id } = action.payload.data;
            const todo = state.todoList.find((elem: Todo) => elem.id === todo_id);
            todo!.commentList = todo!.commentList.filter((elem: Comment) => elem.id !== id);
            return {
                ...state,
                todoList: replaceTodo(state.todoList, todo!),
                alertCommentDelete: null
            };
        }
        case fromActions.ActionTypes.SET_ALERT_TODO_COMMENT_DELETE: {
            return {
                ...state,
                alertCommentDelete: action.payload
            };
        }
        case fromActions.ActionTypes.REQUEST_CREATE_TODO_COMMENT_PENDING: {
            return {
                ...state,
                commentFormLoading: true
            };
        }
        case fromActions.ActionTypes.REQUEST_CREATE_TODO_COMMENT_FULFILLED: {
            const todo_id = action.payload.data.todo_id;
            const comment = new Comment(action.payload.data.comment);
            const todo = state.todoList.find((elem: Todo) => elem.id === todo_id);
            todo!.commentList = [...todo!.commentList, comment];
            return {
                ...state,
                commentFormLoading: false,
                todoList: replaceTodo(state.todoList, todo!),
                commentFormError: {},
                commentFormValue: ''
            };
        }
        case fromActions.ActionTypes.SET_TODO_COMMENT_FORM_VALUE: {
            return {
                ...state,
                commentFormValue: action.payload
            };
        }
        case fromActions.ActionTypes.REQUEST_CREATE_TODO_COMMENT_REJECTED: {
            return {
                ...state,
                commentFormLoading: false,
                commentFormError: action.payload.data
            };
        }
        case fromActions.ActionTypes.SET_SHOW_TODO_FORM: {
            return {
                ...state,
                showTodoForm: action.payload
            };
        }
        case fromActions.ActionTypes.FETCH_TAG_LIST_BY_QUERY_PENDING: {
            return {
                ...state,
                tagSearchLoading: true,
                tagSearchResult: []
            };
        }
        case fromActions.ActionTypes.FETCH_TAG_LIST_BY_QUERY_FULFILLED: {
            const tagSearchResult = action.payload.data.map(apiTag => new TagModel(apiTag));
            return {
                ...state,
                tagSearchLoading: false,
                tagSearchResult: tagSearchResult
            };
        }
        case fromActions.ActionTypes.REQUEST_CREATE_TODO_PENDING: {
            return {
                ...state,
                todoFormLoading: true
            };
        }
        case fromActions.ActionTypes.REQUEST_CREATE_TODO_FULFILLED: {
            const todo: Todo = new Todo(action.payload.data);
            return {
                ...state,
                todoList: [todo, ...state.todoList],
                showTodoForm: false,
                todoFormDialog: {
                    ...initialState.todoFormDialog
                }
            };
        }
        case fromActions.ActionTypes.CHANGE_TODO_FORM_DIALOG: {
            const payload = action.payload;
            return {
                ...state,
                todoFormDialog: {
                    ...state.todoFormDialog,
                    [payload.name]: payload.value
                }
            };
        }
        default: {
            return state;
        }
    }
};
