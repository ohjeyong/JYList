import { User } from '../models/user';
import { ActionTypes } from '../actions/types';
import * as fromActions from '../actions';

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
            return {
                ...state,
                loginLoading: false,
                loginUser: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
