export enum ActionTypes {
    'GET_LOGIN_USER_INFO_BY_TOKEN' = '[user] GET_LOGIN_USER_INFO_BY_TOKEN',
    'GET_LOGIN_USER_INFO_BY_TOKEN_PENDING' = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/PENDING',
    'GET_LOGIN_USER_INFO_BY_TOKEN_FULFILLED' = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/FULFILLED',
    'GET_LOGIN_USER_INFO_BY_TOKEN_REJECTED' = '[user] GET_LOGIN_USER_INFO_BY_TOKEN/REJECTED',
    'LOGOUT' = '[user] LOGOUT',
    'LOGOUT_PENDING' = '[user] LOGOUT/PENDING',
    'LOGOUT_FULFILLED' = '[user] LOGOUT/FULFILLED',
    'LOGOUT_REJECTED' = '[user] LOGOUT/REJECTED',
    'SET_APP_LOADING' = '[app] SET_APP_LOADING',
    'SET_APP_ERROR_MESSAGE' = '[app] SET_APP_ERROR_MESSAGE'
}
