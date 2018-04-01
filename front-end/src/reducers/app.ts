import * as fromActions from '../actions';
import { ActionTypes } from '../actions/types';

export interface AppState {
    loading: boolean;
}

const initialState: AppState = {
    loading: true
};

export const appReducer = (state: AppState = initialState, action: fromActions.Actions): AppState => {
    switch (action.type) {
        case ActionTypes.SET_APP_LOADING: {
            return {
                ...state,
                loading: action.payload
            };
        }
        default: {
            return state;
        }
    }
};
