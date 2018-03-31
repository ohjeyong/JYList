import * as _ from 'lodash';
import { User } from '../models/user';
import { ActionTypes } from '../actions/types';
import * as fromActions from '../actions';
import { setAuthToken } from '../utils/localStorage';

export interface UserState {
    loginUser: User | {};
    loginLoading: boolean;
}

const initialState: UserState = {
    loginUser: {},
    loginLoading: true
};

export const userReducer = (state: UserState = initialState, action: fromActions.Actions): UserState => {
    switch (action.type) {
        case ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_PENDING: {
            return {
                ...state,
                loginLoading: true
            };
        }
        case ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED: {
            const user = action.payload.data;
            if (!_.isEmpty(user)) {
                setAuthToken(user.token);
            }
            return {
                ...state,
                loginLoading: false,
                loginUser: action.payload.data
            };
        }
        default: {
            return state;
        }
    }
};
