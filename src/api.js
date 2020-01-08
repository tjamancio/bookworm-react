import axios from "axios";


export default {
    user: {
        login: (email, password) => axios.post('/sessions', { email, password }).then(res => res.data),
        signup: (username, email, password) => axios.post('/users', { username, email, password }).then(res => res.data),
        confirm: token => axios.post('/confirmation', { token }).then(res => res.data),
        resetPasswordRequest: email => axios.post('/reset-password-request', { email }),
        validateToken: token => axios.post('/validate-token', { token }),
        resetPassword: data => axios.post('/reset-password', { data }),
        fetchCurrentUser: () => axios.get('/users/current-user').then(res => res.data)
    }
}