import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../types";
import api from "../api";

export const userLoggedIn = user => ({
    type: USER_LOGGED_IN,
    user
});

export const userLoggedOut = user => ({
    type: USER_LOGGED_OUT
});

export const login = (email, password) => dispatch => api.user.login(email, password).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn({ ...user, loaded: true }))
});


export const logout = () => dispatch => {
    console.log('aqui');
    localStorage.removeItem('bookwormJWT');
    dispatch(userLoggedOut());
    return;
};

export const confirm = token => dispatch => api.user.confirm(token).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
})

export const resetPasswordRequest = email => () => api.user.resetPasswordRequest(email);

export const validateToken = token => () => api.user.validateToken(token);

export const resetPassword = data => () => api.user.resetPassword(data);

