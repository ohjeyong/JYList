import { ActionTypes } from './types';

interface Action<T extends ActionTypes> {
    type: T;
}

interface ActionWithPayload<T extends ActionTypes, P> extends Action<T> {
    payload: P;
}

export function createAction<T extends ActionTypes>(type: T): Action<T>;
export function createAction<T extends ActionTypes, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends ActionTypes, P>(type: T, payload?: P) {
    return payload === undefined ? { type } : { type, payload };
}
