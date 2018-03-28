import { User } from '../models/user';
import * as fromActions from '../actions';

interface UserState {
    loginUser: User | null;
}

const initialState: UserState = {
    loginUser: null
};

export default (state: UserState = initialState, action: fromActions.Actions) => {
    switch (action.type) {
        case fromActions.ActionTypes.GET_LOGIN_USER_INFO_BY_TOKEN: {
            return state;
        }
        default: {
            return state;
        }
    }
};
