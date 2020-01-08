import { combineReducers } from 'redux';
import user from './user';
import books from './books';
import locale from './locale';
import characters from './characters';

export default combineReducers({
    user,
    books,
    locale,
    characters
})