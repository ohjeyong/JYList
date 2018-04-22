import { AxiosResponse, AxiosError } from 'axios';
import { createAction } from './action-helpers';
import { APIUser } from '../models/user';
import { APITodo } from '../models/todo';

export enum ActionTypes {
    GET_LOGIN_USER_INFO_BY_TOKEN_PENDING = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/PENDING',
    GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/FULFILLED',
    GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/REJECTED',
    LOGOUT_PENDING = '[user] LOGOUT/PENDING',
    LOGOUT_FULFILLED = '[user] LOGOUT/FULFILLED',
    LOGOUT_REJECTED = '[user] LOGOUT/REJECTED',
    SET_APP_LOADING = '[app] SET_APP_LOADING',
    SET_APP_ERROR_MESSAGE = '[app] SET_APP_ERROR_MESSAGE',
    SET_SHOW_SIGNUP_FORM = '[user] SET_SHOW_SIGNUP_FORM',
    SET_SHOW_LOGIN_ERROR_MESSAGE = '[user] SET_SHOW_LOGIN_ERROR_MESSAGE',
    LOGIN_REQUEST_PENDING = '[user] LOGIN_REQUEST_PENDING',
    LOGIN_REQUEST_FULFILLED = '[user] LOGIN_REQUEST_FULFILLED',
    LOGIN_REQUEST_REJECTED = '[user] LOGIN_REQUEST_REJECTED',
    SIGNUP_REQUEST_PENDING = '[user] SIGNUP_REQUEST_PENDING',
    SIGNUP_REQUEST_FULFILLED = '[user] SIGNUP_REQUEST_FULFILLED',
    SIGNUP_REQUEST_REJECTED = '[user] SIGNUP_REQUEST_REJECTED',
    FETCH_TODO_LIST_PENDING = '[todo] FETCH_TODO_LIST_PENDING',
    FETCH_TODO_LIST_FULFILLED = '[todo] FETCH_TODO_LIST_FULFILLED',
    FETCH_TODO_LIST_REJECTED = '[todo] FETCH_TODO_LIST_REJECTED',
    REQUEST_ADD_LIKE = '[todo] REQUEST_ADD_LIKE',
    REQUEST_TODO_REVERT_COMPLETE = '[todo] REQUEST_TODO_REVERT_COMPLETE',
    REQUEST_TODO_COMPLETE = '[todo] REQUEST_TODO_COMPLETE',
    REQUEST_TODO_DELETE = '[todo] REQUEST_TODO_DELETE',
}

export const actions = {
    getLoginUserInfoByTokenPending: () => createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_PENDING),
    getLoginUserInfoByTokenFulfilled: (response: AxiosResponse<APIUser>) =>
        createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED, response),
    getLoginUserInfoByTokenRejected: (response: AxiosError) =>
        createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED, response),
    logoutPending: () => createAction(ActionTypes.LOGOUT_PENDING),
    logoutFulfilled: () => createAction(ActionTypes.LOGOUT_FULFILLED),
    logoutRejected: (response: AxiosError) => createAction(ActionTypes.LOGOUT_REJECTED, response),
    setAppLoading: (value: boolean) => createAction(ActionTypes.SET_APP_LOADING, value),
    setAppErrorMessage: (value: string) => createAction(ActionTypes.SET_APP_ERROR_MESSAGE, value),
    setShowSignupForm: (value: boolean) => createAction(ActionTypes.SET_SHOW_SIGNUP_FORM, value),
    setShowLoginErrorMessage: (value: boolean) => createAction(ActionTypes.SET_SHOW_LOGIN_ERROR_MESSAGE, value),
    loginRequestPending: () => createAction(ActionTypes.LOGIN_REQUEST_PENDING),
    loginRequestFulfilled: (response: AxiosResponse<APIUser>) =>
        createAction(ActionTypes.LOGIN_REQUEST_FULFILLED, response),
    loginRequestRejected: (response: AxiosError) => createAction(ActionTypes.LOGIN_REQUEST_REJECTED, response),
    signupRequestPending: () => createAction(ActionTypes.SIGNUP_REQUEST_PENDING),
    signupRequestFulfilled: (response: AxiosResponse<APIUser>) =>
        createAction(ActionTypes.SIGNUP_REQUEST_FULFILLED, response),
    // signup request rejected 는 201 일 경우 유저 생성, 200 일 경우 올바른 요청이지만 각 필드에 대한 에러 반환.
    signupRequestRejected: (response: AxiosResponse) => createAction(ActionTypes.SIGNUP_REQUEST_REJECTED, response),
    fetchTodoListPending: () => createAction(ActionTypes.FETCH_TODO_LIST_PENDING),
    fetchTodoListFulfilled: (response: AxiosResponse<APITodo[]>) =>
        createAction(ActionTypes.FETCH_TODO_LIST_FULFILLED, response),
    fetchTodoListRejected: (response: AxiosError) => createAction(ActionTypes.FETCH_TODO_LIST_REJECTED, response),
    requestAddLike: (response: AxiosResponse<APITodo>) => createAction(ActionTypes.REQUEST_ADD_LIKE, response),
    requestTodoRevertComplete: (response: AxiosResponse<APITodo>) =>
        createAction(ActionTypes.REQUEST_TODO_REVERT_COMPLETE, response),
    requestTodoComplete: (response: AxiosResponse<APITodo>) =>
        createAction(ActionTypes.REQUEST_TODO_COMPLETE, response),
    requestTodoDelete: (response: AxiosResponse<{id: number}>) =>
        createAction(ActionTypes.REQUEST_TODO_DELETE, response),
};

export type Actions = ReturnType<typeof actions[keyof typeof actions]>;
