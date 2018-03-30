import { combineReducers } from 'redux';
import { UserState, userReducer } from './user';

export interface RootReducer {
    user: UserState;
}

export const rootReducer = combineReducers<RootReducer>({
    user: userReducer
});
