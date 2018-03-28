/* tslint:disable:no-any */
type FunctionType = (...args: any[]) => any;
/* tslint:enable:no-any */
type ActionCreatorsMapObject = { [actionCreator: string]: FunctionType };

export type ActionUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
