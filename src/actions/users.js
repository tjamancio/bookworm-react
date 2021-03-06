import { userLoggedIn } from './auth';
import api from "../api";
import { USER_FETCHED } from '../types';

export const userFetched = user => ({
    type: USER_FETCHED,
    user
})


export const signup = (username, email, password) => dispatch => api.user.signup(username, email, password).then(user => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user))
});

export const fetchCurrentUser = () => dispatch => api.user.fetchCurrentUser().then(user => dispatch(userFetched(user)));
