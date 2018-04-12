import axios from 'axios';
import { User } from '../models/user';
import * as fromActions from '../actions';
import { removeAuthToken, setAuthToken } from '../utils/localStorage';

export interface UserState {
    loginUser: User | {};
    loginLoading: boolean;
    showSignupForm: boolean;
    showLoginErrorMessage: boolean;
    signupLoading: boolean;
    signupError: object;
}

const initialState: UserState = {
    loginUser: {},
    loginLoading: false,
    showSignupForm: false, // if true, show signup form, else, show login form
    showLoginErrorMessage: false,
    signupLoading: false,
    signupError: {}
};

const postLogin = (user: User) => {
    setAuthToken(user.authToken);
    axios.defaults.headers.Authorization = `Token ${user.authToken}`;
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
            const user = new User(action.payload.data);
            postLogin(user);
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
        case fromActions.ActionTypes.SET_SHOW_SIGNUP_FORM: {
            return {
                ...state,
                showSignupForm: action.payload
            };
        }
        case fromActions.ActionTypes.SET_SHOW_LOGIN_ERROR_MESSAGE: {
            return {
                ...state,
                showLoginErrorMessage: action.payload
            };
        }
        case fromActions.ActionTypes.LOGIN_REQUEST_PENDING: {
            return {
                ...state,
                showLoginErrorMessage: false,
                loginLoading: true
            };
        }
        case fromActions.ActionTypes.LOGIN_REQUEST_FULFILLED: {
            const user = new User(action.payload.data);
            postLogin(user);
            return {
                ...state,
                loginLoading: false,
                loginUser: user,
                showLoginErrorMessage: false
            };
        }
        case fromActions.ActionTypes.LOGIN_REQUEST_REJECTED: {
            return {
                ...state,
                loginLoading: false,
                showLoginErrorMessage: true
            };
        }
        case fromActions.ActionTypes.SIGNUP_REQUEST_PENDING: {
            return {
                ...state,
                signupError: {},
                signupLoading: true
            };
        }
        case fromActions.ActionTypes.SIGNUP_REQUEST_FULFILLED: {
            const user = new User(action.payload.data);
            postLogin(user);
            return {
                ...state,
                signupLoading: false,
                signupError: {},
                loginUser: user
            };
        }
        case fromActions.ActionTypes.SIGNUP_REQUEST_REJECTED: {
            return {
                ...state,
                signupLoading: false,
                signupError: action.payload.data
            };
        }
        default: {
            return state;
        }
    }
};
