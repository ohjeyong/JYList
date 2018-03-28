import axios, { AxiosPromise } from 'axios';
import { createAction } from './action-helpers';
import { ActionUnion } from './types';
import { User } from '../models/user';

axios.defaults.baseURL = 'http://localhost:8000/';

export enum ActionTypes {
    GET_LOGIN_USER_INFO_BY_TOKEN = '[user] GET_LOGIN_USER_INFO_BY_TOKEN'
}

export const Actions = {
    getLoginUserInfoByToken: () => {
        const token = localStorage.getItem('token');
        const request = axios.get('/', {
            headers: {
                'Authorization': token
            }
        });
        return createAction(ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN, request as AxiosPromise<User>);
    }
};

export type Actions = ActionUnion<typeof Actions>;
