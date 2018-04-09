import axios, { AxiosResponse, AxiosError } from 'axios';
import { ThunkActionCreators, actions, createAction, ActionTypes } from '.';
import { User } from '../models/user';
import { getAuthToken } from '../utils/localStorage';

axios.defaults.baseURL = 'http://localhost:8000/';

export const thunks: ThunkActionCreators = {
    getLoginUserInfoByToken: () => {
        return async (dispatch, getState, extraArgs) => {
            dispatch(actions.getLoginUserInfoByTokenPending());
            const token = getAuthToken();
            try {
                const response = await axios.get('/api/users/me/', {
                    headers: {
                        'Authorization': `Token ${token}`
                    }
                });
                dispatch(actions.getLoginUserInfoByTokenFulfilled(response));
            } catch (error) {
                if (error.response!.status === 401) {
                    dispatch(actions.getLoginUserInfoByTokenRejected(error));
                    dispatch(actions.setAppLoading(false));
                } else {
                    dispatch(actions.setAppErrorMessage(error.message));
                }
            }
        };
    }
};
