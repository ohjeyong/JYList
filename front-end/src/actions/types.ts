import { AxiosResponse, AxiosError } from 'axios';
import { createAction } from './action-helpers';
import { User } from '../models/user';

export enum ActionTypes {
    'GET_LOGIN_USER_INFO_BY_TOKEN_PENDING' = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/PENDING',
    'GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED' = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/FULFILLED',
    'GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED' = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/REJECTED',
    'LOGOUT_PENDING' = '[user] LOGOUT/PENDING',
    'LOGOUT_FULFILLED' = '[user] LOGOUT/FULFILLED',
    'LOGOUT_REJECTED' = '[user] LOGOUT/REJECTED',
    'SET_APP_LOADING' = '[app] SET_APP_LOADING',
    'SET_APP_ERROR_MESSAGE' = '[app] SET_APP_ERROR_MESSAGE'
}

export const actions = {
    getLoginUserInfoByTokenPending: () => createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_PENDING),
    getLoginUserInfoByTokenFulfilled: (response: AxiosResponse<User>) =>
     createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED, response),
    getLoginUserInfoByTokenRejected: (response: AxiosError) =>
     createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED, response),
    logoutPending: () => createAction(ActionTypes.LOGOUT_PENDING),
    logoutFulfilled: () => createAction(ActionTypes.LOGOUT_FULFILLED),
    logoutRejected: (response: AxiosError) => createAction(ActionTypes.LOGOUT_REJECTED, response),
    setAppLoading: (value: boolean) => createAction(ActionTypes.SET_APP_LOADING, value),
    setAppErrorMessage: (value: string) => createAction(ActionTypes.SET_APP_ERROR_MESSAGE, value)
};

export type Actions = ReturnType<typeof actions[keyof typeof actions]>;
