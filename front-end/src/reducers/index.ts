import { combineReducers } from 'redux';
import { UserState, userReducer } from './user';
import { AppState, appReducer } from './app';

export interface RootReducer {
    user: UserState;
    app: AppState;
}

export const rootReducer = combineReducers<RootReducer>({
    user: userReducer,
    app: appReducer
});
