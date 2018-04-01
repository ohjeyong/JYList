import * as fromActions from '../actions';
import { ActionTypes } from '../actions/types';

export interface AppState {
    loading: boolean;
    errorMessage: string;
}

const initialState: AppState = {
    loading: true,
    errorMessage: ''
};

export const appReducer = (state: AppState = initialState, action: fromActions.Actions): AppState => {
    switch (action.type) {
        case ActionTypes.SET_APP_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        case ActionTypes.SET_APP_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
