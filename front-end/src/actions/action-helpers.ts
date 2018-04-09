import { ThunkAction } from 'redux-thunk';
import { ActionTypes } from '.';
import { RootReducer } from '../reducers';

interface Action<T extends ActionTypes> {
    type: T;
}

interface ActionWithPayload<T extends ActionTypes, P> extends Action<T> {
    payload: P;
}

/* tslint:disable:no-any */
interface ThunkActionCreator {
    (...args: any[]): ThunkAction<void, RootReducer, {}>;
}
/* tslint:enable:no-any */

export interface ThunkActionCreators {
    [key: string]: ThunkActionCreator;
}

export function createAction<T extends ActionTypes>(type: T): Action<T>;
export function createAction<T extends ActionTypes, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends ActionTypes, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}
