import * as _ from 'lodash';
import axios from 'axios';
import { User } from '../models/user';
import * as fromActions from '../actions';
import { removeAuthToken, setAuthToken } from '../utils/localStorage';

export interface UserState {
    loginUser: User | {};
    loginLoading: boolean;
}

const initialState: UserState = {
    loginUser: {},
    loginLoading: false
};

export const userReducer = (state: UserState = initialState, action: fromActions.Actions): UserState => {
    switch (action.type) {
        case fromActions.ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_PENDING: {
            return {
                ...state,
                loginLoading: true
            };
        }
        case fromActions.ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED: {
            const user = action.payload.data;
            if (!_.isEmpty(user)) {
                setAuthToken(user.auth_token);
                axios.defaults.headers.Authorization = user.auth_token;
            }
            return {
                ...state,
                loginLoading: false,
                loginUser: user
            };
        }
        case fromActions.ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED: {
            return {
                ...state,
                loginLoading: false,
                loginUser: {}
            };
        }
        case fromActions.ActionTypes.LOGOUT_PENDING: {
            return {
                ...state,
                loginLoading: true
            };
        }
        case fromActions.ActionTypes.LOGOUT_FULFILLED: {
            removeAuthToken();
            return {
                ...state,
                loginLoading: false,
                loginUser: {}
            };
        }
        default: {
            return state;
        }
    }
};
