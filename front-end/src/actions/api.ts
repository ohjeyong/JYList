import axios from 'axios';
import { actions } from './types';
import { getAuthToken } from '../utils/localStorage';
import { Dispatch } from 'react-redux';
import { RootReducer } from '../reducers';
import { Todo, Comment, Category } from '../models/todo';

if (process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:8000';
} else {
    axios.defaults.baseURL = 'https://jylist.cc';
}

export const thunksActionCreators = {
    getLoginUserInfoByToken: () => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.getLoginUserInfoByTokenPending());
            const token = getAuthToken();
            try {
                const response = await axios.get('/api/users/me/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                dispatch(actions.getLoginUserInfoByTokenFulfilled(response));
                dispatch(actions.setAppLoading(false));
            } catch (error) {
                if (error.response!.status === 401) {
                    dispatch(actions.getLoginUserInfoByTokenRejected(error));
                    dispatch(actions.setAppLoading(false));
                } else {
                    dispatch(actions.setAppErrorMessage(error.message));
                }
            }
        };
    },
    logoutRequest: () => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.logoutPending());
            try {
                await axios.get('/api/users/me/');
                dispatch(actions.logoutFulfilled());
            } catch (error) {
                dispatch(actions.logoutRejected(error));
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    setAppLoading: actions.setAppLoading,
    setAppErrorMessage: actions.setAppErrorMessage,
    setShowSignupForm: actions.setShowSignupForm,
    setShowLoginErrorMessage: actions.setShowLoginErrorMessage,
    loginRequest: (username: string, password: string) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.loginRequestPending());
            try {
                const response = await axios.post('/api/users/login/', {
                    username, password
                });
                dispatch(actions.loginRequestFulfilled(response));
                dispatch(actions.setAppLoading(false));
            } catch (error) {
                const errorProcess = () => {
                    dispatch(actions.setAppLoading(false));
                    if (error.response!.status === 401) {
                        dispatch(actions.loginRequestRejected(error));
                    } else {
                        dispatch(actions.setAppErrorMessage(error.message));
                    }
                };
                setTimeout(errorProcess, 300);
            }
        };
    },
    signupRequest: (username: string, password1: string, password2: string, name: string) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.signupRequestPending());
            try {
                const response = await axios.post('/api/users/signup/', {
                    username, password1, password2, name
                });
                if (response.status === 201) {
                    dispatch(actions.signupRequestFulfilled(response));
                    dispatch(actions.setAppLoading(false));
                } else {
                    setTimeout(() => dispatch(actions.signupRequestRejected(response)), 300);
                }
            } catch (error) {
                dispatch(actions.setAppLoading(false));
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    fetchTodoList: () => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.fetchTodoListPending());
            try {
                const response = await axios.get('/api/todo/');
                dispatch(actions.fetchTodoListFulfilled(response));
            } catch (error) {
                dispatch(actions.fetchTodoListRejected(error));
            }
        };
    },
    requestAddLike: (todoId: number) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            try {
                const response = await axios.post(`/api/todo/${todoId}/add_like/`);
                dispatch(actions.requestAddLike(response));
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    requestTodoRevertComplete: (todoId: number) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            try {
                const response = await axios.post(`/api/todo/${todoId}/revert_complete/`);
                dispatch(actions.requestTodoRevertComplete(response));
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    requestTodoComplete: (todoId: number) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            try {
                const response = await axios.post(`/api/todo/${todoId}/complete/`);
                dispatch(actions.requestTodoComplete(response));
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    requestTodoDelete: (todoId: number) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            try {
                const response = await axios.delete(`/api/todo/${todoId}/`);
                dispatch(actions.requestTodoDelete(response));
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    setAlertTodoDelete: (todo: Todo | null) => actions.setAlertTodoDelete(todo),
    requestTodoCommentDelete: (comment: Comment) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            try {
                const response = await axios.delete(`/api/todo-comment/${comment.id}/`);
                dispatch(actions.requestTodoCommentDelete(response));
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    setAlertTodoCommentDelete: (comment: Comment | null) => actions.setAlertTodoCommentDelete(comment),
    requestCreateTodoComment: (todoId: number, content: string) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.requestCreateTodoCommentPending());
            try {
                const response = await axios.post(`/api/todo-comment/`, {
                    todo_id: todoId,
                    content: content
                });
                if (response.status === 201) {
                    dispatch(actions.requestCreateTodoCommentFulfilled(response));
                } else {
                    dispatch(actions.requestCreateTodoCommentRejected(response));
                }
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error));
            }
        };
    },
    setTodoCommentFormValue: (value: string) => actions.setTodoCommentFormValue(value),
    setShowTodoForm: (value: boolean) => actions.setShowTodoForm(value),
    fetchTagListByQuery: (value: string) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.fetchTagListByQueryPending());
            try {
                const response = await axios.get(`/api/tag-list/search/`, {
                    params: {
                        q: value
                    }
                });
                dispatch(actions.fetchTagListByQueryFulfilled(response));
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    requestCreateTodo: (category: keyof Category, content: string, tagList: { name: string }[]) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.requestCreateTodoPending());
            try {
                const response = await axios.post('/api/todo/', {
                    category,
                    content,
                    tag_list: tagList
                });
                dispatch(actions.requestCreateTodoFulfilled(response));
            } catch (error) {
                dispatch(actions.requestCreateTodoRejected(error));
            }
        };
    },
    // tslint:disable-next-line
    changeTodoFormDialog: (name: 'category' | 'content' | 'tagList' | 'error', value: any) =>
        actions.changeTodoFormDialog(name, value)
};
