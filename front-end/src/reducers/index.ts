import { combineReducers } from 'redux';
import { UserState, userReducer } from './user';
import { TodoState, todoReducer } from './todo';
import { AppState, appReducer } from './app';

export { UserState, AppState, TodoState, todoReducer };

export interface RootReducer {
    user: UserState;
    app: AppState;
    todo: TodoState;
}

export const rootReducer = combineReducers<RootReducer>({
    user: userReducer,
    app: appReducer,
    todo: todoReducer
});
