import axios from 'axios';
import { actions } from './types';
import { getAuthToken } from '../utils/localStorage';
import { Dispatch } from 'react-redux';
import { RootReducer } from '../reducers';

axios.defaults.baseURL = 'http://localhost:8000/';

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
    logout: () => {
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
    setAppErrorMessage: actions.setAppErrorMessage
};
