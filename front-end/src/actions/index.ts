import axios, { AxiosPromise, AxiosResponse } from 'axios';
import { ActionTypes } from './types';
import { createAction, Action, ActionWithPayload } from './action-helpers';
import { User } from '../models/user';
import { getAuthToken } from '../utils/localStorage';

axios.defaults.baseURL = 'http://localhost:8000/';

export function getLoginUserInfoByToken() {
    const token = getAuthToken();
    const request = axios.get('/api/users/me/', {
        headers: {
            'Authorization': `Token ${token}`
        }
    });
    return createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN, request as AxiosPromise<User>);
}

type GetLoginUserInfoByTokenPending = Action<ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_PENDING>;
type GetLoginUserInfoByTokenFulfilled =
    ActionWithPayload<ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED, AxiosResponse<User>>;
type GetLoginUserInfoByTokenRejected = ActionWithPayload<ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED, {}>;

export type Actions = GetLoginUserInfoByTokenPending | GetLoginUserInfoByTokenFulfilled |
    GetLoginUserInfoByTokenRejected;
