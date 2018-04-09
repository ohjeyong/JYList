export { ActionTypes, actions, Actions } from './types';
export { createAction, ThunkActionCreators } from './action-helpers';

/* tslint:disable:align */
import axios, { AxiosPromise, AxiosResponse, AxiosError } from 'axios';
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
        }).then((response: AxiosResponse<User>) => {
            dispatch(createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED, response));
            dispatch(createAction(ActionTypes.SET_APP_LOADING, false));
        }, (error: AxiosError) => {
            if (error.response!.status === 401) {
                dispatch(createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED, error));
                dispatch(createAction(ActionTypes.SET_APP_LOADING, false));
            } else {
                dispatch(createAction(ActionTypes.SET_APP_ERROR_MESSAGE, error.message));
            }
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
type GetLoginUserInfoByTokenRejected = ActionWithPayload<ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED, AxiosError>;

type LogoutPending = Action<ActionTypes.LOGOUT_PENDING>;
type LogoutFulfilled = ActionWithPayload<ActionTypes.LOGOUT_FULFILLED, null>;
type LogoutRejected = ActionWithPayload<ActionTypes.LOGOUT_REJECTED, AxiosError>;

type SetAppLoading = ActionWithPayload<ActionTypes.SET_APP_LOADING, boolean>;

type SetAppErrorMessage = ActionWithPayload<ActionTypes.SET_APP_ERROR_MESSAGE, string>;

// export type Actions = GetLoginUserInfoByTokenPending | GetLoginUserInfoByTokenFulfilled |
//     GetLoginUserInfoByTokenRejected | LogoutPending | LogoutFulfilled | LogoutRejected | SetAppLoading
//     | SetAppErrorMessage;
