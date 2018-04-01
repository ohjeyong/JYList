/* tslint:disable:align */
import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ActionTypes } from './types';
import { createAction, Action, ActionWithPayload } from './action-helpers';
import { User } from '../models/user';
import { RootReducer } from '../reducers';
import { getAuthToken } from '../utils/localStorage';
import { Dispatch } from 'redux';

axios.defaults.baseURL = 'http://localhost:8000/';

export function getLoginUserInfoByToken() {
    const token = getAuthToken();
    return (dispatch: Dispatch<RootReducer>) => {
        dispatch(createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_PENDING));
        axios.get('/api/users/me/', {
            headers: {
                'Authorization': `Token ${token}`
            }
        }).then(response => {
            dispatch(createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED, response));
            dispatch(createAction(ActionTypes.SET_APP_LOADING, false));
        }, error => {
            dispatch(createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED, error));
        });
    };
}

export function logout() {
    const request = axios.get('/api/users/logout/');
    return createAction(ActionTypes.LOGOUT, request as AxiosPromise<null>);
}

export function setAppLoading(value: boolean) {
    return createAction(ActionTypes.SET_APP_LOADING, value);
}

type GetLoginUserInfoByTokenPending = Action<ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_PENDING>;
type GetLoginUserInfoByTokenFulfilled =
    ActionWithPayload<ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED, AxiosResponse<User>>;
type GetLoginUserInfoByTokenRejected = ActionWithPayload<ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED, {}>;

type LogoutPending = Action<ActionTypes.LOGOUT_PENDING>;
type LogoutFulfilled = ActionWithPayload<ActionTypes.LOGOUT_FULFILLED, null>;
type LogoutRejected = ActionWithPayload<ActionTypes.LOGOUT_REJECTED, {}>;

type SetAppLoading = ActionWithPayload<ActionTypes.SET_APP_LOADING, boolean>;

export type Actions = GetLoginUserInfoByTokenPending | GetLoginUserInfoByTokenFulfilled |
    GetLoginUserInfoByTokenRejected | LogoutPending | LogoutFulfilled | LogoutRejected | SetAppLoading;
