import axios from 'axios';
import { actions } from './types';
import { getAuthToken } from '../utils/localStorage';
import { Dispatch } from 'react-redux';
import { RootReducer } from '../reducers';

axios.defaults.baseURL = 'http://localhost:8000';

export const thunksActionCreators = {
    getLoginUserInfoByToken: () => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.getLoginUserInfoByTokenPending());
            const token = getAuthToken();
            try {
                const response = await axios.get('/api/users/me/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                dispatch(actions.getLoginUserInfoByTokenFulfilled(response));
                dispatch(actions.setAppLoading(false));
            } catch (error) {
                if (error.response!.status === 401) {
                    dispatch(actions.getLoginUserInfoByTokenRejected(error));
                    dispatch(actions.setAppLoading(false));
                } else {
                    dispatch(actions.setAppErrorMessage(error.message));
                }
            }
        };
    },
    logoutRequest: () => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.logoutPending());
            try {
                await axios.get('/api/users/me/');
                dispatch(actions.logoutFulfilled());
            } catch (error) {
                dispatch(actions.logoutRejected(error));
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    setAppLoading: actions.setAppLoading,
    setAppErrorMessage: actions.setAppErrorMessage,
    setShowSignupForm: actions.setShowSignupForm,
    setShowLoginErrorMessage: actions.setShowLoginErrorMessage,
    loginRequest: (username: string, password: string) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.loginRequestPending());
            try {
                const response = await axios.post('/api/users/login/', {
                    username, password
                });
                dispatch(actions.loginRequestFulfilled(response));
                dispatch(actions.setAppLoading(false));
            } catch (error) {
                const errorProcess = () => {
                    dispatch(actions.setAppLoading(false));
                    if (error.response!.status === 401) {
                        dispatch(actions.loginRequestRejected(error));
                    } else {
                        dispatch(actions.setAppErrorMessage(error.message));
                    }
                };
                setTimeout(errorProcess, 300);
            }
        };
    },
    signupRequest: (username: string, password1: string, password2: string, name: string) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.signupRequestPending());
            try {
                const response = await axios.post('/api/users/signup/', {
                    username, password1, password2, name
                });
                if (response.status === 201) {
                    dispatch(actions.signupRequestFulfilled(response));
                    dispatch(actions.setAppLoading(false));
                } else {
                    setTimeout(() => dispatch(actions.signupRequestRejected(response)), 300);
                }
            } catch (error) {
                dispatch(actions.setAppLoading(false));
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    },
    fetchTodoList: () => {
        return async (dispatch: Dispatch<RootReducer>) => {
            dispatch(actions.fetchTodoListPending());
            try {
                const response = await axios.get('/api/todo/');
                dispatch(actions.fetchTodoListFulfilled(response));
            } catch (error) {
                dispatch(actions.fetchTodoListRejected(error));
            }
        };
    },
    requestAddLike: (todoId: number) => {
        return async (dispatch: Dispatch<RootReducer>) => {
            try {
                const response = await axios.post(`/api/todo/${todoId}/add_like/`);
                dispatch(actions.requestAddLike(response));
            } catch (error) {
                dispatch(actions.setAppErrorMessage(error.message));
            }
        };
    }
};
